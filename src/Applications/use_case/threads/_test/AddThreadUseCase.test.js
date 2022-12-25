/* eslint-disable no-undef */

const ThreadRepository = require('../../../../Domains/threads/ThreadRepository');
const AddedThread = require('../../../../Domains/threads/entities/AddedThread');
const AddThread = require('../../../../Domains/threads/entities/AddThread');
const AddThreadUseCase = require('../AddThreadUseCase');

describe('AddThreadUseCase', () => {
    /**
     * Menguji apakah use case mampu mengoskestrasikan langkah demi langkah dengan benar.
     */
    it('should orchestrating the add thread action correctly', async () => {
        // Arrange
        const useCasePayload = {
            title: 'thread title',
            body: 'thread body',
            owner: 'user-1',
        };

        const expectedAddedThread = new AddedThread({
            id: 'thread-1',
            title: 'thread title',
            owner: 'user-1',
        });

        /** creating dependency of use case */
        const mockThreadRepository = new ThreadRepository();

        /** mocking needed function */
        mockThreadRepository.addThread = jest.fn()
            .mockImplementation(() => Promise.resolve(expectedAddedThread));

        /** creating use case instance */
        const addThreadUseCase = new AddThreadUseCase({
            threadRepository: mockThreadRepository,
        });

        // Action
        const addedThread = await addThreadUseCase.execute(useCasePayload);

        // Assert
        expect(addedThread).toStrictEqual(expectedAddedThread);
        expect(mockThreadRepository.addThread).toBeCalledWith(new AddThread({
            title: useCasePayload.title,
            body: useCasePayload.body,
            owner: useCasePayload.owner,
        }));
    });
});
