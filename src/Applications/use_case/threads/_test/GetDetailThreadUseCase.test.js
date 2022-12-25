/* eslint-disable no-undef */

const ThreadRepository = require('../../../../Domains/threads/ThreadRepository');
const GetDetailThreadUseCase = require('../GetDetailThreadUseCase');
const CommentRepository = require('../../../../Domains/comments/CommentRepository');

describe('GetDetailThreadUseCase', () => {
    /**
     * Menguji apakah use case mampu mengoskestrasikan langkah demi langkah dengan benar.
     */
    it('should orchestrating the get detail a thread action correctly', async () => {
        // Arrange
        const useCasePayload = {
            threadId: 'thread-123',
        };

        const expectedGetThreadById = {
            id: 'thread-123',
            title: 'thread abc',
            body: 'thread abc ...',
            created_at: '2022-12-18 23:46:55.208221+07',
            owner: 'user-1',
            username: 'david',
        };

        const expectedGetCommentsFromThread = [
            {
                id: 'comment-1',
                content: 'sebuah comment',
                owner: 'user-1',
                username: 'david',
                thread: 'thread-wSKIx-KrKicyFmke_XiTo',
                created_at: '2022-12-17 23:46:55.445067+07',
                deleted_at: '2022-12-18 23:46:55.445067+07',
            },
            {
                id: 'comment-1',
                content: 'sebuah comment',
                owner: 'user-1',
                username: 'david',
                thread: 'thread-sDqKxL7WmBRhBubZ5jrds',
                created_at: '2022-12-18 23:46:57.657136+07',
                deleted_at: null,
            },
        ];

        const mockThreadRepository = new ThreadRepository();
        const mockCommentRepository = new CommentRepository();

        mockThreadRepository.getThreadById = jest.fn()
            .mockImplementation(() => Promise.resolve(expectedGetThreadById));
        mockCommentRepository.getCommentsFromThread = jest.fn()
            .mockImplementation(() => Promise.resolve(expectedGetCommentsFromThread));

        const getDetailThreadUseCase = new GetDetailThreadUseCase({
            threadRepository: mockThreadRepository,
            commentRepository: mockCommentRepository,
        });

        // Action
        const detailThread = await getDetailThreadUseCase.execute(useCasePayload.threadId);

        // Assert
        expect(mockThreadRepository.getThreadById)
            .toHaveBeenCalledWith(useCasePayload.threadId);
        expect(mockCommentRepository.getCommentsFromThread)
            .toHaveBeenCalledWith(useCasePayload.threadId);

        expect(detailThread.id).toEqual(expectedGetThreadById.id);
        expect(detailThread.title).toEqual(expectedGetThreadById.title);
        expect(detailThread.body).toEqual(expectedGetThreadById.body);
        expect(detailThread.date).toEqual(expectedGetThreadById.created_at);
        expect(detailThread.username).toEqual(expectedGetThreadById.username);

        expect(detailThread.comments).toStrictEqual([
            {
                id: expectedGetCommentsFromThread[0].id,
                username: expectedGetCommentsFromThread[0].username,
                date: expectedGetCommentsFromThread[0].created_at,
                content: '**komentar telah dihapus**',
            },
            {
                id: expectedGetCommentsFromThread[1].id,
                username: expectedGetCommentsFromThread[1].username,
                date: expectedGetCommentsFromThread[1].created_at,
                content: expectedGetCommentsFromThread[1].content,
            },
        ]);
    });
});
