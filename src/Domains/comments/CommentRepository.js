class CommentRepository {
	async addComment(payload) {
		throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
	}

	async deleteComment(id) {
		throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
	}

	async getCommentsFromThread(threadId) {
		throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
	}
}

module.exports = CommentRepository;
