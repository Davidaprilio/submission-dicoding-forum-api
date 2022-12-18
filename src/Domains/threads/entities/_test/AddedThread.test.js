const AddedThread = require('../AddedThread');

describe('a AddedThread entities', () => {
    it('should throw error when payload did not contain needed property', () => {
        const payload = {
            id: 'thread-1',
            title: 'thread abc',
        };

        expect(() => new AddedThread(payload)).toThrowError('ADDED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should throw error when payload did not meet data type specification', () => {
        const payload = {
            id: 1,
            title: 'title abc',
            owner: true,
        };

        expect(() => new AddedThread(payload)).toThrowError('ADDED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('should throw an error when the title exceeds the max', () => {
        // Arrange
        const payload = {
            id: 'thread-1',
            title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            owner: 'user-1',
        };

        // Action and Assert
        expect(() => new AddedThread(payload)).toThrowError('ADDED_THREAD.TITLE_LIMIT_CHAR');
    });

    it('should create AddedThread entities correctly', () => {
        const payload = {
            id: 'thread-1',
            title: 'thread abc',
            owner: 'user-1',
        };

        const addedThread = new AddedThread(payload);

        expect(addedThread).toBeInstanceOf(AddedThread);
        expect(addedThread.id).toEqual(payload.id);
        expect(addedThread.title).toEqual(payload.title);
        expect(addedThread.owner).toEqual(payload.owner);
    });
});