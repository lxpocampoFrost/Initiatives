const { pool } = require('../config/database');
const poolQuery = require('util').promisify(pool.query).bind(pool);

const getAllInitiatives = async () => {
	
};

const formatDate = (dateString) => {
	const options = { month: 'short', day: 'numeric', year: 'numeric' };
	return new Date(dateString).toLocaleDateString('en-US', options);
};

module.exports = {
	getAllInitiatives,
};
