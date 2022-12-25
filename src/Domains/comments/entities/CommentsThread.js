class CommentsThread {
    constructor(payload) {
        this._verifyPayload(payload);
        this.comments = this._mappingPayload(payload);
    }

    _verifyPayload(comments) {
        if (!comments) {
            throw new Error('COMMENTS_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
        }

        if (!Array.isArray(comments)) {
            throw new Error('COMMENTS_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }
    }

    _mappingPayload(comments) {
        return comments.map(({ id, username, created_at, content, deleted_at }) => {
            if (!id || !username || !content || !created_at || deleted_at === undefined) {
                throw new Error('COMMENTS_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
            }

            if (
                typeof id !== 'string' ||
                typeof username !== 'string' ||
                typeof content !== 'string' ||
                typeof created_at !== 'string' ||
                !(typeof deleted_at === 'string' || deleted_at === null)
            ) {
                throw new Error('COMMENTS_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
            }

            return {
                id,
                username,
                date: created_at,
                content: deleted_at ? '**komentar telah dihapus**' : content,
            }
        });
    }
}

module.exports = CommentsThread;