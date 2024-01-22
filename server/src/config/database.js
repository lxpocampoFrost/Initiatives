const mysql = require('mysql2');

const pool = mysql.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD || '',
	database: process.env.DB_NAME,
	connectionLimit: 10,
});

const keepConnectionAlive = async () => {
	try {
		const connection = await pool.promise().getConnection();
		console.log('Connected to the database');

		await connection.query('SELECT 1');
		console.log('Connection live');

		connection.release();
	} catch (err) {
		console.error('Error:', err);
	}
};

const interval = 50000;
setInterval(keepConnectionAlive, interval);

module.exports = { pool };
