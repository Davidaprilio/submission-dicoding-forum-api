/* eslint-disable no-undef */

const CommentRepository = require('../../../../Domains/comments/CommentRepository');
const ThreadRepository = require('../../../../Domains/threads/ThreadRepository');
const AddedComment = require('../../../../Domains/comments/entities/AddedComment');
const AddComment = require('../../../../Domains/comments/entities/AddComment');
const AddCommentUseCase = require('../AddCommentUseCase');

describe('AddCommentUseCase', () => {
    /**
     * Menguji apakah use case mampu mengoskestrasikan langkah demi langkah dengan benar.
     */
    it('should orchestrating the add comment action correctly', async () => {
        // Arrange
        const useCasePayload = {
            thread_id: 'thread-1',
            content: 'text comment',
            owner: 'user-1',
        };

        const expectedAddedComment = new AddedComment({
            id: 'comment-1',
            thread_id: 'thread-1',
            content: 'text comment',
            owner: 'user-1',
        });

        /** creating dependency of use case */
        const mockCommentRepository = new CommentRepository();
        const mockThreadRepository = new ThreadRepository();

        /** mocking needed function */
        mockCommentRepository.addComment = jest.fn().mockImplementation(
            () => Promise.resolve(new AddedComment({
                id: 'comment-1',
                thread_id: 'thread-1',
                content: 'text comment',
                owner: 'user-1',
            })),
        );

        mockThreadRepository.verifyThreadAvaibility = jest.fn()
            .mockImplementation(() => Promise.resolve());

        /** creating use case instance */
        const addCommentUseCase = new AddCommentUseCase({
            commentRepository: mockCommentRepository,
            threadRepository: mockThreadRepository,
        });

        // Action
        const addedComment = await addCommentUseCase.execute(useCasePayload);

        // Assert
        expect(addedComment).toStrictEqual(expectedAddedComment);
        expect(mockThreadRepository.verifyThreadAvaibility)
            .toBeCalledWith(useCasePayload.thread_id);

        expect(mockCommentRepository.addComment).toBeCalledWith(new AddComment({
            content: useCasePayload.content,
            thread_id: useCasePayload.thread_id,
            owner: useCasePayload.owner,
        }));
    });
});
