const { pool } = require('../config/database');
const poolQuery = require('util').promisify(pool.query).bind(pool);

const getAllTags = async () => {
	try {
		const results = await poolQuery('SELECT * FROM tags');
		return results;
	} catch (error) {
		throw error;
	}
};

module.exports = { getAllTags };
