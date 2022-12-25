/* eslint-disable no-undef */

const CommentsThread = require('../CommentsThread');

describe('a CommentsThread entities', () => {
    it('should throw error when payload did not contain needed property', () => {
        // Arrange
        const payload = [
            {
                id: 'comment-1',
                content: 'sebuah comment',
                owner: 'user-1',
                thread: 'thread-wSKIx-KrKicyFmke_XiTo',
                created_at: '2022-12-18 23:46:55.445067+07',
            },
        ];

        // Action and Assert
        expect(() => new CommentsThread(payload)).toThrowError('COMMENTS_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should throw error when payload did not meet data type specification', () => {
        // Arrange
        const payload = [
            {
                id: 1,
                content: 'sebuah comment',
                owner: 'user-1',
                username: 1,
                thread: 'thread-wSKIx-KrKicyFmke_XiTo',
                created_at: '2022-12-18 23:46:55.445067+07',
                deleted_at: '2022-12-14 23:46:55.445067+07',
            },
        ];

        // Action and Assert
        expect(() => new CommentsThread(payload)).toThrowError('COMMENTS_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('must create format comments valid object Correctly', () => {
        // Arrange
        const payload = [
            {
                id: 'comment-1',
                content: 'sebuah comment',
                owner: 'user-1',
                username: 'david',
                thread: 'thread-wSKIx-KrKicyFmke_XiTo',
                created_at: '2022-12-18 23:46:55.445067+07',
                deleted_at: null,
            },
            {
                id: 'comment-1',
                content: 'sebuah comment',
                owner: 'user-1',
                username: 'david',
                thread: 'thread-wSKIx-KrKicyFmke_XiTo',
                created_at: '2022-12-17 23:46:55.445067+07',
                deleted_at: '2022-12-18 23:46:55.445067+07',
            },
        ];

        // Action and Assert
        const commentsThread = new CommentsThread(payload);
        expect(commentsThread.comments).toStrictEqual([
            {
                id: payload[0].id,
                username: payload[0].username,
                date: payload[0].created_at,
                content: payload[0].content,
            },
            {
                id: payload[1].id,
                username: payload[1].username,
                date: payload[1].created_at,
                content: '**komentar telah dihapus**',
            },
        ]);
    });
});
