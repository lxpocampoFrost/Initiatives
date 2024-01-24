const { getAllTags } = require('../controllers/tags.controller');
const { getAllPosts, getPostById, createPost, updatePost, deletePost } = require('../controllers/post.controller');

const { OpenAI } = require('openai');
const axios = require('axios');

const openai = new OpenAI({
	apiKey: process.env.OPENAI_KEY,
});

const assign_tags = `
	Select a maximum of three tags based on this criteria. Example: 1,3

	1 - HTML: Select this if the title emphasizes HTML-specific topics, web page structure, or provides HTML tutorials.
	2 - CSS: Select this if the title focuses on CSS styling, design techniques, or web design aspects.
	3 - JS: Select this if the title centered around JavaScript development, frontend interaction, or React development if 'React' is not explicitly mentioned.
	4 - React: Select this if the title is React-specific content.
	5 - Webflow: Select this if the title is related to the Webflow platform.
    6 - Frontend: Select this if the title applies to more general frontend development topics.
	7 - Backend: Select this if the title centered around backend development.
	8 - Onboarding: Select this if the title relates to onboarding processes and documentations
	9 - Library: Select this if the title relates to any library / package that can be used in development. 
`;

const getAnalyzedData = async (text) => {
	let summary = '';
	let startTime = Date.now();
	let gpt_response = {
		summary: '',
		tags: [],
	};
	try {
		let completion = await openai.chat.completions.create({
			model: 'gpt-4',
			messages: [
				{
					role: 'system',
					content: 'You are a helpful assistant.',
				},
				{
					role: 'user',
					content: `Extract the data from ${text} then summarize and explain in maximum of two paragraphs. Provide external links for reference in list. Return the output in raw HTML format without any introductions.`,
				},
			],
			temperature: 0,
			max_tokens: 1000,
		});

		summary = completion.choices[0].message.content;

		gpt_response.summary = summary;
		if (summary !== '') {
			completion = await openai.chat.completions.create({
				model: 'gpt-4',
				messages: [
					{
						role: 'system',
						content: summary,
					},
					{
						role: 'user',
						content: `Base from the summary, assign tags using this ${assign_tags}.`,
					},
				],
				temperature: 0,
				max_tokens: 800,
			});
		}

		let tagResponse = completion.choices[0].message.content;

		gpt_response.tags = tagResponse.split(',');

		const endTime = Date.now();
		const responseTimeInSeconds = (endTime - startTime) / 1000;

		console.log(`OpenAI response time: ${responseTimeInSeconds} seconds`);
	} catch (error) {
		throw error;
	}

	return gpt_response;
};

const resolvers = {
	Query: {
		tags: async () => {
			try {
				const tags = await getAllTags();
				return tags;
			} catch (error) {
				throw new Error('Failed to fetch tags', error);
			}
		},
		getAllPosts: async (_, { orderBy, tags, createdBy, page = 1, pageSize = 9 }) => {
			try {
				const posts = await getAllPosts(orderBy, tags, createdBy, page, pageSize);
				return posts;
			} catch (error) {
				throw new Error('Failed to fetch posts', error);
			}
		},
		getPostById: async (_, { id }) => {
			try {
				const post = await getPostById(id);

				if (!post) {
					throw new Error('Post not found');
				}

				return post;
			} catch (error) {
				throw new Error('Failed to fetch post by ID', error);
			}
		},
		hailstormData: async () => {
			try {
				const res = await axios.get(process.env.HAILSTORM_API);
				return res.data.users;
			} catch (error) {
				throw new Error('Failed to fetch data', error);
			}
		},
	},
	Mutation: {
		createPost: async (_, { title, post, created_by }, context) => {
			try {
				if (!title || !post) {
					throw new Error('All fields are required.');
				}

				gpt_response = await getAnalyzedData(post);

				const postData = {
					title,
					post,
					tagsId: gpt_response.tags,
					explanation: gpt_response.summary,
					created_by,
					created_date: new Date().toISOString(),
					deleted: false,
				};

				const postId = await createPost(postData);

				const createdPost = await getPostById(postId);

				return { data: createdPost, success: true, message: 'Post created successfully' };
			} catch (error) {
				console.error('Error:', error);
				throw new Error('Failed to create post.');
			}
		},
		updatePost: async (_, { postId, post, title }) => {
			try {
				const existingPost = await getPostById(postId);

				if (!existingPost) {
					throw new Error('Post not found');
				}

				gpt_response = await getAnalyzedData(post);

				const updatedPostData = {
					title: title || existingPost.title,
					post: post || existingPost.post,
					tagsId: gpt_response.tags,
					explanation: gpt_response.summary,
					updated_date: new Date().toISOString(),
				};

				const updatedPostId = await updatePost(postId, updatedPostData);

				const updatedPost = await getPostById(updatedPostId);

				return { data: updatedPost, success: true, message: 'Post updated successfully' };
			} catch (error) {
				console.error('Error:', error);
			}
		},
		deletePost: async (_, { postId }) => {
			try {
				await deletePost(postId);
				return { success: true, message: 'Post deleted successfully' };
			} catch (error) {
				throw new Error('Failed to delete post', error);
			}
		},
	},
};

module.exports = resolvers;
