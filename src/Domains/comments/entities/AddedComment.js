class AddedComment {
    constructor(payload) {
        this._verifyPayload(payload);

        const { id, thread, content, owner } = payload;
        this.id = id;
        this.thread = thread;
        this.content = content;
        this.owner = owner;
    }

    _verifyPayload({ id, thread, content, owner }) {
        if (!id || !thread || !content || !owner) {
            throw new Error('ADDED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
        }

        if (
            typeof id !== 'string' || 
            typeof thread !== 'string' || 
            typeof content !== 'string' || 
            typeof owner !== 'string'
        ) {
            throw new Error('ADDED_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }
    }
}

module.exports = AddedComment;