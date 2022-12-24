const CommentRepository = require('../../../../Domains/comments/CommentRepository');
const ThreadRepository = require('../../../../Domains/threads/ThreadRepository');
const DeleteCommentUseCase = require('../DeleteCommentUseCase');

describe('DeleteCommentUseCase', () => {
    it('should orchestrating the delete comment correclty', async () => {
        const useCasePayload = {
            threadId: 'thread-1',
            commentId: 'comment-1',
            owner: 'user-1',
        };

        const mockCommentRepository = new CommentRepository();
        const mockThreadRepository = new ThreadRepository();

        mockThreadRepository.getThreadById = jest.fn()
            .mockImplementation(() => Promise.resolve());
        mockCommentRepository.verifyOwner = jest.fn()
            .mockImplementation(() => Promise.resolve());
        mockCommentRepository.deleteComment = jest.fn()
            .mockImplementation(() => Promise.resolve());

        const deleteCommentUseCase = new DeleteCommentUseCase({
            commentRepository: mockCommentRepository,
            threadRepository: mockThreadRepository,
        });

        await deleteCommentUseCase.execute(useCasePayload);

        expect(mockThreadRepository.getThreadById).toBeCalledWith(useCasePayload.threadId);
        expect(mockCommentRepository.verifyOwner).toBeCalledWith(
            useCasePayload.commentId,
            useCasePayload.owner,
        );
        expect(mockCommentRepository.deleteComment).toBeCalledWith(useCasePayload.commentId);
    });
});