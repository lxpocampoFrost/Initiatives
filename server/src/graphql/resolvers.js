const { getAllTags } = require('../controllers/tags.controller');
const { getAllPosts, getPostById, createPost, updatePost, deletePost } = require('../controllers/post.controller');
const { OpenAI } = require('openai');
const axios = require('axios');

const openai = new OpenAI({
	apiKey: process.env.OPENAI_KEY,
});

const assign_tags = `
	Please analyze the given text and assign up to three tags from the list below. If the text is too short or unrelated to any tags, return 0.

	1 - HTML: For HTML-specific topics, web page structure, or HTML tutorials.
	2 - CSS: For CSS styling, design techniques, or web design aspects.
	3 - JS: For JavaScript development, frontend interaction, or React development (if React is not explicitly mentioned).
	4 - React: For React-specific content.
	5 - Webflow: For content related to the Webflow platform.
    6 - Frontend: For general frontend development topics.
	7 - Backend: For backend development topics.
	8 - Onboarding: For onboarding processes and documentations.
	9 - Library: For any library/package used in development.

	Example: If the text is about HTML and CSS, return '1,2'.
`;

const getAnalyzedData = async (text) => {
	let summary = '';
	let startTime = Date.now();
	let gpt_response = {
		summary: '',
		tags: [],
	};

	const parsed = JSON.parse(text);
	const content = parsed.map((obj) => obj.data.text).join(' ');

	let role_instructions = `
		As a Technical Design Analyst you highlight key points and summarize data provided to you. 
		Anything unrelated to tech and design work you return 'invalid' only without explanations.
	`
	let prompt = `
		Tone: 50% spartan. No introductions. Check this data: ${content} and summarize and
		explain in two paragraphs with max of 2 sentences each. Return the output in raw HTML format.
	`

	try {
		let completion = await openai.chat.completions.create({
			model: 'gpt-4',
			messages: [
				{
					role: 'system',
					content: role_instructions
				},
				{
					role: 'user',
					content: prompt,
				},
			],
			temperature: 0,
			max_tokens: 1000,
		});

		summary = completion.choices[0].message.content;
		
		console.log(summary)

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
						content: `Assign tags using this ${assign_tags}.`,
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
		getAllPosts: async (_, { orderBy, tags, createdBy, title, page = 1, pageSize = 9 }) => {
			try {
				const posts = await getAllPosts(orderBy, tags, createdBy, title, page, pageSize);
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

				if (gpt_response && gpt_response.summary == 'Invalid') {
					throw new Error('Invalid content provided');
				}

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
				return {
					data: null,
					success: false,
					message: error.message,
				};
			}
		},
		updatePost: async (_, { postId, post, title }) => {
			try {
				const existingPost = await getPostById(postId);

				if (!existingPost) {
					throw new Error('Post not found');
				}

				gpt_response = await getAnalyzedData(post);

				if (gpt_response && gpt_response.summary == 'Invalid') {
					throw new Error('Invalid content provided');
				}

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
				return {
					data: null,
					success: false,
					message: error.message,
				};
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
