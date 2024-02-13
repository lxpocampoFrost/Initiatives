const { getAllTags, getTagById, createTag, updateTag, deleteTag } = require('../controllers/tags.controller');
const { getAllPosts, getPostById, createPost, updatePost, deletePost } = require('../controllers/post.controller');

const { OpenAI } = require('openai');
const axios = require('axios');

const openai = new OpenAI({
	apiKey: process.env.OPENAI_KEY,
});

const getAnalyzedData = async (text) => {
	let summary = '';
	let startTime = Date.now();
	let gpt_response = {
		summary: '',
	};

	const parsed = JSON.parse(text);
	const content = parsed.map((obj) => obj.data.text).join(' ');

	let role_instructions = `
		As a Technical Design Analyst you highlight key points and summarize data provided to you. 
		Anything unrelated to tech and design work you return 'invalid' only without explanations.
	`;
	let prompt = `
		Tone: 50% spartan. No introductions. Check this data: ${content} and summarize and
		explain in two paragraphs with max of 2 sentences each. Return the output in raw HTML format.
	`;

	try {
		let completion = await openai.chat.completions.create({
			model: 'gpt-4',
			messages: [
				{
					role: 'system',
					content: role_instructions,
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

		role_instructions = `
			You are a technical design analyst and you assign tags based on the content you receive.
			You also only assign a maximum of 3 tags.
		`;

		gpt_response.summary = summary;

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
		posts: async (_, { filter, pagination }) => {
			try {
				const { posts, count, currentPage } = await getAllPosts({ ...filter, ...pagination });
				return {
					items: posts,
					count,
					currentPage,
				};
			} catch (error) {
				throw new Error('Failed to fetch posts', error);
			}
		},
		postId: async (_, { id }) => {
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
		tag: async (_, { id }) => {
			try {
				const tags = await getTagById(id);

				if (!tags || tags.length === 0) {
					throw new Error('Tag not found');
				}

				return tags[0];
			} catch (error) {
				throw new Error('Failed to fetch tag by ID', error);
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
		createdPost: async (_, { input }) => {
			try {
				const { title, post, tagsId, created_by } = input;

				if (!title || !post || !tagsId) {
					throw new Error('All fields are required.');
				}

				gpt_response = await getAnalyzedData(post);

				if (gpt_response && gpt_response.summary == 'Invalid') {
					throw new Error('Invalid content provided');
				}

				const postData = {
					title,
					post,
					tagsId: tagsId,
					explanation: gpt_response.summary,
					created_by,
				};

				const postId = await createPost(postData);

				const createdPost = await getPostById(postId);

				return { data: createdPost, success: true, message: 'Post created successfully', error: null };
			} catch (error) {
				return {
					data: null,
					success: false,
					message: 'Failed to create post',
					error: {
						message: error.message,
						code: 'POST_CREATION_ERROR',
					},
				};
			}
		},
		updatedPost: async (_, { postId, input }) => {
			try {
				const { title, post, tagsId } = input;

				if (!tagsId) {
					throw new Error('Tags are required.');
				}

				const existingPost = await getPostById(postId);

				if (!existingPost) {
					throw new Error('Post not found');
				}

				let gpt_response;

				if (title && post) {
					gpt_response = await getAnalyzedData(post);

					if (gpt_response && gpt_response.summary == 'Invalid') {
						throw new Error('Invalid content provided');
					}
				}

				const updatedPostData = {
					title: title || existingPost.title,
					post: post || existingPost.post,
					tagsId: tagsId || existingPost.tags,
					explanation: (gpt_response && gpt_response.summary) || existingPost.explanation,
					updated_date: new Date().toISOString().slice(0, 19).replace('T', ' '),
				};

				const updatedPostId = await updatePost(postId, updatedPostData);

				const updatedPost = await getPostById(updatedPostId);

				return { data: updatedPost, success: true, message: 'Post updated successfully', error: null };
			} catch (error) {
				return {
					data: null,
					success: false,
					message: 'Failed to update post',
					error: {
						message: error.message,
						code: 'POST_UPDATE_ERROR',
					},
				};
			}
		},
		deletedPost: async (_, { postId }) => {
			try {
				await deletePost(postId);
				return { success: true, message: 'Post deleted successfully', error: null };
			} catch (error) {
				return {
					data: null,
					success: false,
					message: 'Failed to delete post',
					error: {
						message: error.message,
						code: 'POST_DELETE_ERROR',
					},
				};
			}
		},
		createdTag: async (_, { name }) => {
			try {
				const createdTags = await createTag(name);

				const tagIds = createdTags.map((result) => result.insertId);
				const tagsData = await getTagById(tagIds);

				return { data: tagsData, success: true, message: 'Tag created successfully', error: null };
			} catch (error) {
				if (error.code === 'TAG_ALREADY_EXISTS') {
					return {
						data: null,
						success: false,
						message: 'Failed to create tag. Tag already exists.',
						error: {
							message: 'Tag already exists',
							code: 'TAG_ALREADY_EXISTS',
						},
					};
				} else {
					return {
						data: null,
						success: false,
						message: 'Failed to create tag',
						error: {
							message: error.message,
							code: 'TAG_CREATION_ERROR',
						},
					};
				}
			}
		},
		updatedTag: async (_, { tagId, tag }) => {
			try {
				const existingTag = await getTagById(tagId);
				const existingTagValue = existingTag[0].tag;

				if (!existingTag || existingTag.length === 0) {
					throw new Error('Tag not found');
				}

				if (tag !== existingTagValue) {
					const updatedTag = await updateTag(tagId, tag);
					const updatedTagData = await getTagById(updatedTag);

					return { data: updatedTagData, success: true, message: 'Tag updated successfully', error: null };
				}
			} catch (error) {
				return {
					data: null,
					success: false,
					message: 'Failed to update tag',
					error: {
						message: error.message,
						code: 'TAG_UPDATE_ERROR',
					},
				};
			}
		},
		deletedTag: async (_, { tagId }) => {
			try {
				deleteTag(tagId);
				return { success: true, message: 'Tag deleted successfully', error: null };
			} catch (error) {
				return {
					data: null,
					success: false,
					message: 'Failed to delete tag',
					error: {
						message: error.message,
						code: 'TAG_DELETE_ERROR',
					},
				};
			}
		},
	},
};

module.exports = resolvers;
