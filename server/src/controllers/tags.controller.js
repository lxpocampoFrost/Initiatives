const { pool } = require('../config/database');
const poolQuery = require('util').promisify(pool.query).bind(pool);

const getAllTags = async () => {
	try {
		const results = await poolQuery(`
      SELECT tags.id, tags.tag, COUNT(posts_tags.post_id) AS post_count
      FROM tags
      LEFT JOIN posts_tags ON tags.id = posts_tags.tag_id
      GROUP BY tags.id, tags.tag
    `);
		return results;
	} catch (error) {
		throw error;
	}
};

const getTagById = async (tagIds) => {
	try {
		const placeholders = tagIds.map(() => '?').join(',');
		const query = `SELECT * FROM tags WHERE id IN (${placeholders})`;
		const result = await poolQuery(query, tagIds);

		if (result.length > 0) {
			return result;
		} else {
			throw new Error('Tags not found');
		}
	} catch (error) {
		throw error;
	}
};

const createTag = async (tagNames) => {
	let transaction;
	try {
		transaction = await poolQuery('BEGIN');

		const results = [];

		for (const tagName of tagNames) {
			const existingTag = await poolQuery('SELECT id FROM tags WHERE tag = ?', [tagName]);

			if (existingTag.length === 0) {
				const result = await poolQuery('INSERT INTO tags (tag) VALUES (?)', [tagName]);
				results.push(result);
			} else {
				throw { message: 'Tag already exists.', code: 'TAG_ALREADY_EXISTS' };
			}
		}

		await poolQuery('COMMIT');

		return results;
	} catch (error) {
		if (transaction) {
			await poolQuery('ROLLBACK');
		}
		throw error;
	}
};

const updateTag = async (tagId, newTagName) => {
	try {
		await poolQuery('UPDATE tags SET tag = ? WHERE id = ?', [newTagName, tagId]);
		return tagId;
	} catch (error) {
		throw error;
	}
};

const deleteTag = async (tagId) => {
	try {
		await poolQuery('DELETE FROM tags WHERE id = ?', [tagId]);
	} catch (error) {
		throw error;
	}
};

module.exports = { getAllTags, getTagById, createTag, updateTag, deleteTag };
