/* eslint-disable no-undef */

const AddedComment = require('../AddedComment');

describe('a AddedComment entities', () => {
    it('should throw error when payload did not contain needed property', () => {
        // Arrange
        const payload = {
            id: 'comment-1',
            thread_id: 'thread-1',
            content: 'text comment',
        };

        // Action and Assert
        expect(() => new AddedComment(payload)).toThrowError('ADDED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should throw error when payload did not meet data type specification', () => {
        // Arrange
        const payload = {
            id: 1,
            thread_id: 'thread-1',
            content: 1,
            owner: 1,
        };

        // Action and Assert
        expect(() => new AddedComment(payload)).toThrowError('ADDED_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('must create addedComment object Correctly', () => {
        // Arrange
        const payload = {
            id: 'comment-1',
            thread_id: 'thread-1',
            content: 'text comment',
            owner: 'user-1',
        };

        // Action and Assert
        const {
            id,
            thread_id,
            content,
            owner,
        } = new AddedComment(payload);

        expect(id).toEqual(payload.id);
        expect(thread_id).toEqual(payload.thread_id);
        expect(content).toEqual(payload.content);
        expect(owner).toEqual(payload.owner);
    });
});
