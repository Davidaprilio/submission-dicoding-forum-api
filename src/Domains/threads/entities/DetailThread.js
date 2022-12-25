class DetailThread {
    constructor(payload) {
        this._verifyPayload(payload);

        this.id = payload.id;
        this.title = payload.title;
        this.body = payload.body;
        this.date = payload.created_at;
        this.username = payload.username;
    }

    _verifyPayload({
        id,
        title,
        body,
        created_at,
        username,
    }) {
        if (!id || !title || !body || !created_at || !username) {
            throw new Error('DETAIL_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
        }

        if (
            typeof id !== 'string' || 
            typeof title !== 'string' || 
            typeof body !== 'string' || 
            typeof created_at !== 'string' || 
            typeof username !== 'string'
        ) {
            throw new Error('DETAIL_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }
    }
}

module.exports = DetailThread;