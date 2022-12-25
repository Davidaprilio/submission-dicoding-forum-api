/* eslint-disable no-undef */

const AddComment = require('../AddComment');

describe('a AddComment entities', () => {
    it('should throw error when payload did not contain needed property', () => {
        // Arrange
        const payload = {
            thread_id: 'thread-1',
            content: 'text comment',
        };

        // Action and Assert
        expect(() => new AddComment(payload)).toThrowError('ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should throw error when payload did not meet data type specification', () => {
        // Arrange
        const payload = {
            thread_id: 'thread-1',
            content: 1,
            owner: 1,
        };

        // Action and Assert
        expect(() => new AddComment(payload)).toThrowError('ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('must create addComment object Correctly', () => {
        // Arrange
        const payload = {
            thread_id: 'thread-1',
            content: 'text comment',
            owner: 'user-1',
        };

        // Action and Assert
        const { thread_id, content, owner } = new AddComment(payload);

        expect(thread_id).toEqual(payload.thread_id);
        expect(content).toEqual(payload.content);
        expect(owner).toEqual(payload.owner);
    });
});
