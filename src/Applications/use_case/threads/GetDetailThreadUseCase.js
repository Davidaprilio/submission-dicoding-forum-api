const CommentsThread = require("../../../Domains/comments/entities/CommentsThread");
const DetailThread = require("../../../Domains/threads/entities/DetailThread")

class GetDetailThreadUseCase {
    constructor ({ threadRepository, commentRepository }) {
        this._threadRepository = threadRepository;
        this._commentRepository = commentRepository;
    }
    
    async execute(threadID) {
        const thread = await this._threadRepository.getThreadById(threadID)
        const detailThread = new DetailThread(thread);

        const commentsFromThread = await this._commentRepository.getCommentsFromThread(threadID);
        detailThread.comments = new CommentsThread(commentsFromThread).comments;
        
        return detailThread;
    }
}

module.exports = GetDetailThreadUseCase