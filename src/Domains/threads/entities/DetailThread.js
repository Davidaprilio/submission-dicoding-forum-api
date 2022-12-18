class DetailThread {
    constructor(payload) {
        this._verifyPayload(payload);

        this.id = payload.id;
        this.title = payload.title;
        this.body = payload.body;
        this.date = payload.createdAt;
        this.username = payload.username;
    }

    _verifyPayload({
        id,
        title,
        body,
        createdAt,
        username,
    }) {
        if (!id || !title || !body || !createdAt || !username) {
            throw new Error('DETAIL_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
        }

        if (
            typeof id !== 'string' || 
            typeof title !== 'string' || 
            typeof body !== 'string' || 
            typeof createdAt !== 'string' || 
            typeof username !== 'string'
        ) {
            throw new Error('DETAIL_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }

        if (title.length > 200) {
            throw new Error('DETAIL_THREAD.TITLE_LIMIT_CHAR');
        }
    }
}

module.exports = DetailThread;