class AddedThread {
    constructor(payload) {
        this._verifyPayload(payload);

        this.id = payload.id;
        this.title = payload.title;
        this.owner = payload.owner;
    }

    _verifyPayload({ id, title, owner }) {
        if (!id || !title || !owner) {
            throw new Error('ADDED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
        }

        if (typeof id !== 'string' || typeof title !== 'string' || typeof owner !== 'string') {
            throw new Error('ADDED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }

        if (title.length > 200) {
            throw new Error('ADDED_THREAD.TITLE_LIMIT_CHAR');
        }
    }
}

module.exports = AddedThread;