/* eslint-disable camelcase */

exports.up = (pgm) => {
    pgm.createTable('comments', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
        },
        content: {
            type: 'TEXT',
            notNull: true,
        },
        owner: {
            type: 'VARCHAR(50)',
            notNull: true,
        },
        thread_id: {
            type: 'VARCHAR(50)',
            notNull: true,
        },
        created_at: {
            type: 'VARCHAR',
            notNull: true,
            default: pgm.func('CURRENT_TIMESTAMP'),
        },
        deleted_at: {
            type: 'VARCHAR',
        },
    })

    // pgm.createConstraint(
    //     'comments', 
    //     'fk_comments.owner_users.id', 
    //     'FOREIGN KEY(owner) REFERENCES users(id)'
    // );
    pgm.createConstraint(
        'comments', 
        'fk_comments.thread_id_threads.id', 
        'FOREIGN KEY(thread_id) REFERENCES threads(id) ON DELETE CASCADE'
    );
};

exports.down = (pgm) => {
    pgm.dropTable('comments')
};
