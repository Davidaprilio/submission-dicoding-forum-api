const AddComment = require("../../../Domains/comments/entities/AddComment")

class AddCommentUseCase {
    constructor ({ commentRepository, threadRepository }) {
        this._commentRepository = commentRepository
        this._threadRepository = threadRepository
    }
    
    async execute(useCasePayload) {
        const addComment = new AddComment(useCasePayload)

        await this._threadRepository.getThreadById(addComment.thread_id)

        return await this._commentRepository.addComment(addComment)
    }
}

module.exports = AddCommentUseCase