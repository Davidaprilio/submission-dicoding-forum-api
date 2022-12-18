const AddedComment = require('../../Domains/comments/entities/AddedComment');
const CommentRepository = require('../../Domains/comments/CommentRepository')

class CommentRepositoryPostgres extends CommentRepository {
    constructor(pool, idGenerator) {
        super();
		this._pool = pool;
		this._idGenerator = idGenerator;
    }

    async addComment(addComment) { 
        const { thread_id, content, owner } = addComment;
        const id = `comment-${this._idGenerator()}`;

        const query = {
			text: 'INSERT INTO comments (id, thread_id, content, owner) VALUES($1, $2, $3, $4) RETURNING id, thread_id, content, owner',
			values: [id, thread_id, content, owner],
		};

        const result = await this._pool.query(query);

		return new AddedComment({ ...result.rows[0] });
        
    }
}

module.exports = CommentRepositoryPostgres