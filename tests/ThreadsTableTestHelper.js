/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const ThreadsTableTestHelper = {
    async addThread({
        id = 'thread-1',
        title = 'thread abc',
        body = 'thread abc body ...',
        owner = 'user-1',
        created_at = (new Date()).toISOString(),
    }) {
        const query = {
            text: 'INSERT INTO threads (id, title, body, owner, created_at) VALUES ($1, $2, $3, $4, $5)',
            values: [id, title, body, owner, created_at],
        };

        await pool.query(query);
    },

    async findThreadById(id) {
        const query = {
            text: 'SELECT * FROM threads WHERE id = $1',
            values: [id],
        };

        const { rows } = await pool.query(query);
        return rows;
    },

    async cleanTable() {
        const query = 'TRUNCATE threads';
        await pool.query(query);
    },
};

module.exports = ThreadsTableTestHelper;
