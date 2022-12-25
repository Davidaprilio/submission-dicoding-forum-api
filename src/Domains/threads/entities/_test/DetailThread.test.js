const DetailThread = require('../DetailThread')

describe('a DetailThread entities', () => {
    it('should throw error when payload did not contain needed property', () => {
        // Arrange
        const payload = {
            id: 1,
            title: 'thread abc',
            username: 'user-1',
        };

        // Action and Assert
        expect(() => new DetailThread(payload)).toThrowError('DETAIL_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should throw error when payload did not meet data type specification', () => {
        // Arrange
        const payload = {
            id: 123,
            title: 'thread abc',
            body: 'abc',
            created_at: 123,
            username: 'david',
        };

        // Action and Assert
        expect(() => new DetailThread(payload)).toThrowError('DETAIL_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('must create DetailThread object Correctly', () => {
        const payload = {
            id: 'thread-1',
            title: 'thread abc',
            body: 'abcde ...',
            created_at: '2021-08-08T07:19:09.775Z',
            username: 'david',
        };

        const { body, title, id, date, username } = new DetailThread(payload);

        expect(body).toEqual(payload.body);
        expect(title).toEqual(payload.title);
        expect(id).toEqual(payload.id);
        expect(date).toEqual(payload.created_at);
        expect(username).toEqual(payload.username);

    })

})