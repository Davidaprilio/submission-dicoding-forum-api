const DeleteComment = require('../DeleteComment');

describe('a DeleteComment entities', () => {
    it('should throw error when payload did not contain needed property', () => {
        // Arrange
        const payload = {
            commentId: 'comment-1'
        };

        // Action and Assert
        expect(() => new DeleteComment(payload)).toThrowError('DELETE_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should throw error when payload did not meet data type specification', () => {
        // Arrange
        const payload = {
            threadId: 'thread-1',
            commentId: 1,
            owner: 123,
        };

        // Action and Assert
        expect(() => new DeleteComment(payload)).toThrowError('DELETE_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('must create addedComment object Correctly', () => {
        // Arrange
        const payload = {
            threadId: 'thread-1',
            commentId: 'comment-1',
            owner: 'user-1',
        };

        // Action and Assert
        const { threadId, commentId, owner } = new DeleteComment(payload);

        expect(threadId).toEqual(payload.threadId);
        expect(commentId).toEqual(payload.commentId);
        expect(owner).toEqual(payload.owner);
    });
});