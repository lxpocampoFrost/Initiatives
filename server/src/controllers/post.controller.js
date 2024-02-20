const { pool } = require('../config/database');
const poolQuery = require('util').promisify(pool.query).bind(pool);

const getAllPosts = async () => {
	
};

const getPostById = async () => {
	
};

const createPost = async () => {
	
};

const updatePost = async () => {
	
};

const deletePost = async () => {
	
};

const formatDate = (dateString) => {
	const options = { month: 'short', day: 'numeric', year: 'numeric' };
	return new Date(dateString).toLocaleDateString('en-US', options);
};

module.exports = {
	getAllPosts,
	getPostById,
	createPost,
	updatePost,
	deletePost,
};
