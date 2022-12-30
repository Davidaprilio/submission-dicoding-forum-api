const DeleteComment = require('../../../Domains/comments/entities/DeleteComment');

class DeleteCommentUseCase {
    constructor({ commentRepository, threadRepository }) {
        this._commentRepository = commentRepository;
        this._threadRepository = threadRepository;
    }

    async execute(useCasePayload) {
        const deleteComment = new DeleteComment(useCasePayload);

        await this._threadRepository.verifyThreadAvaibility(deleteComment.threadId);
        await this._commentRepository.verifyOwner(deleteComment.commentId, deleteComment.owner);

        await this._commentRepository.deleteComment(deleteComment.commentId);
    }
}

module.exports = DeleteCommentUseCase;
