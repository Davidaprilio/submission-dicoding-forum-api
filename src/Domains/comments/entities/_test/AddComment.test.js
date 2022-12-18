const AddComment = require('../AddComment');

describe('a AddComment entities', () => {
    it('should throw error when payload did not contain needed property', () => {
        // Arrange
        const payload = {
            thread: 'thread-1',
            content: 'text comment',
        };

        // Action and Assert
        expect(() => new AddComment(payload)).toThrowError('ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should throw error when payload did not meet data type specification', () => {
        // Arrange
        const payload = {
            thread: 'thread-1',
            content: 1,
            owner: 1,
        };

        // Action and Assert
        expect(() => new AddComment(payload)).toThrowError('ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('must create addComment object Correctly', () => {
        // Arrange
        const payload = {
            thread: 'thread-1',
            content: 'text comment',
            owner: 'user-1',
        };

        // Action and Assert
        const { thread, content, owner } = new AddComment(payload);

        expect(thread).toEqual(payload.thread);
        expect(content).toEqual(payload.content);
        expect(owner).toEqual(payload.owner);
    });
});