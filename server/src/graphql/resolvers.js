const { getAllTags } = require('../controllers/tags.controller');
const { getAllPosts, getPostById, createPost, updatePost, deletePost } = require('../controllers/post.controller');
const { OpenAI } = require('openai');
const axios = require('axios');

const openai = new OpenAI({
	apiKey: process.env.OPENAI_KEY,
});

const assign_tags = `
	Please analyze the given text and assign up to three tags from the list below. If the text is too short or unrelated to any tags, return 0.

	1 - HTML: This includes topics such as tags, attributes, forms, input types, text formatting, links, images, tables, lists, layouts, semantics, multimedia, SVG, canvas, and accessibility.
	2 - CSS: This includes topics such as selectors, properties, values, pseudo-classes, pseudo-elements, box model, layout types (flexbox, grid), responsive design, animations, transitions, preprocessors (Sass, Less), methodologies (BEM, SMACSS), and CSS frameworks (Bootstrap, Tailwind).
	3 - JS: This includes topics such as variables, data types, operators, control structures, functions, objects, arrays, asynchronous JavaScript, AJAX, Promises, Fetch API, ES6+ features, error handling, testing, and debugging.
	4 - React: This includes topics such as React components, JSX, state management, props, lifecycle methods, hooks, React Router, context API, Redux, and testing React applications.
	5 - Webflow: This includes topics such as Webflow design, CMS, interactions and animations, responsive design, ecommerce on Webflow, SEO settings, and custom code in Webflow.
    6 - Frontend: This includes topics such as HTML, CSS, JavaScript, DOM manipulation, responsive design, performance optimization, accessibility, version control/Git, Web APIs, testing/debugging, browser developer tools, building and automation tools, web security knowledge, package managers, CSS pre-processing, command line, and frameworks/libraries like React or Angular.
	7 - Backend: This includes servers, APIs, database configuration, data handling, middleware, server-side scripting, network communications, server hosting, data backup and recovery, security compliance, and server performance monitoring.
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
				const { posts, count, currentPage } = await getAllPosts(orderBy, tags, createdBy, title, page, pageSize);
				return {
					posts,
					count,
					currentPage,
				};
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
