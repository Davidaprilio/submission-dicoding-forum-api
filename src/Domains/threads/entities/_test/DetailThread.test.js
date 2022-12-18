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
            createdAt: 123,
            username: 123,
        };

        // Action and Assert
        expect(() => new DetailThread(payload)).toThrowError('DETAIL_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('should throw an error when the title exceeds the max', () => {
        // Arrange
        const payload = {
            id: 'thread-1',
            title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            body: 'abcde ...',
            createdAt: '2021-08-08T07:19:09.775Z',
            username: 'user-1',
        };

        // Action and Assert
        expect(() => new DetailThread(payload)).toThrowError('DETAIL_THREAD.TITLE_LIMIT_CHAR');
    });

    it('must create DetailThread object Correctly', () => {
        const payload = {
            id: 'thread-1',
            title: 'thread abc',
            body: 'abcde ...',
            createdAt: '2021-08-08T07:19:09.775Z',
            username: 'user-1',
        };

        const { body, title, id, date, username } = new DetailThread(payload);

        expect(body).toEqual(payload.body);
        expect(title).toEqual(payload.title);
        expect(id).toEqual(payload.id);
        expect(date).toEqual(payload.createdAt);
        expect(username).toEqual(payload.username);

    })

})