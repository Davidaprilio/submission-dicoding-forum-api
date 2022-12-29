/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const CommentsTableTestHelper = {
    async addComment({
        id = 'comment-1',
        content = 'text comment',
        thread = 'thread-1',
        owner = 'user-1',
        created_at = (new Date()).toISOString(),
    }) {
        const query = {
            text: 'INSERT INTO comments (id, content, thread_id, owner, created_at) VALUES ($1, $2, $3, $4, $5)',
            values: [id, content, thread, owner, created_at],
        };

        await pool.query(query);
    },

    async findCommentById(id) {
        const query = {
            text: 'SELECT * FROM comments WHERE id = $1',
            values: [id],
        };

        const { rows } = await pool.query(query);
        return rows;
    },

    async cleanTable() {
        const query = 'TRUNCATE comments';
        await pool.query(query);
    },
};

module.exports = CommentsTableTestHelper;
