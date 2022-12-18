const CommentRepository = require('../../../../Domains/comments/CommentRepository');
const ThreadRepository = require('../../../../Domains/threads/ThreadRepository');
const AddedComment = require('../../../../Domains/comments/entities/AddedComment');
const AddedThread = require('../../../../Domains/threads/entities/AddedThread');
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

		const expectedAddedThread = new AddedThread({
			id: 'thread-1',
			title: 'thread abc',
			owner: 'user-1',
		})

		/** creating dependency of use case */
		const mockCommentRepository = new CommentRepository();
		const mockThreadRepository = new ThreadRepository();

		/** mocking needed function */
		mockCommentRepository.addComment = jest.fn()
			.mockImplementation(() => Promise.resolve(expectedAddedComment));

		mockThreadRepository.getThreadById = jest.fn()
			.mockImplementation(() => Promise.resolve(expectedAddedThread));

		/** creating use case instance */
		const addCommentUseCase = new AddCommentUseCase({
			commentRepository: mockCommentRepository,
			threadRepository: mockThreadRepository,
		});

		// Action
		const addedComment = await addCommentUseCase.execute(useCasePayload);

		// Assert
		expect(addedComment).toStrictEqual(expectedAddedComment);
		expect(mockCommentRepository.addComment).toBeCalledWith(new AddComment({
			content: useCasePayload.content,
			thread_id: useCasePayload.thread_id,
			owner: useCasePayload.owner,
		}));
	});
})