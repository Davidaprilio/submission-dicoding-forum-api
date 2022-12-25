/* eslint-disable no-undef */

const pool = require('../../database/postgres/pool');
const CommentRepositoryPostgres = require('../CommentRepositoryPostgres');
const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const AddComment = require('../../../Domains/comments/entities/AddComment');
const AddedComment = require('../../../Domains/comments/entities/AddedComment');
const AuthorizationError = require('../../../Commons/exceptions/AuthorizationError');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');

describe('CommentRepositoryPostgres', () => {
    beforeEach(async () => {
        await UsersTableTestHelper.addUser({
            id: 'user-1',
            username: 'dicoding',
            password: 'secret',
            fullname: 'Dicoding Indonesia',
        });
        await ThreadsTableTestHelper.addThread({
            id: 'thread-1',
            title: 'thread abc',
            body: 'thread abc body ...',
            owner: 'user-1',
        });
    });

    afterEach(async () => {
        await UsersTableTestHelper.cleanTable();
    });

    afterAll(async () => {
        await pool.end();
    });

    describe('addComment function', () => {
        it('should persist add comment', async () => {
            const addComment = new AddComment({
                content: 'text comment',
                thread_id: 'thread-1',
                owner: 'user-1',
            });

            const fakeIdGenerator = () => '123'; // stub!
            const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);

            await commentRepositoryPostgres.addComment(addComment);

            const comments = await CommentsTableTestHelper.findCommentById('comment-123');
            expect(comments).toHaveLength(1);
        });

        it('should return added comment correctly', async () => {
            const addComment = new AddComment({
                content: 'text comment',
                thread_id: 'thread-1',
                owner: 'user-1',
            });

            const fakeIdGenerator = () => '123'; // stub!
            const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);

            const addedComment = await commentRepositoryPostgres.addComment(addComment);

            expect(addedComment).toStrictEqual(new AddedComment({
                id: 'comment-123',
                content: addComment.content,
                thread_id: addComment.thread_id,
                owner: addComment.owner,
            }));
        });
    });

    describe('verifyOwner function', () => {
        it('should throw NotFoundError when comment not found', async () => {
            const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, () => {});

            await expect(commentRepositoryPostgres.verifyOwner('comment-0', 'user-1')).rejects.toThrowError(NotFoundError);
        });

        it('should throw AuthorizationError when owner unauthorized', async () => {
            await CommentsTableTestHelper.addComment({
                id: 'comment-1',
                content: 'text comment',
                thread: 'thread-1',
                owner: 'user-1',
            });

            const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, () => {});

            await expect(commentRepositoryPostgres.verifyOwner('comment-1', 'other-user'))
                .rejects.toThrowError(AuthorizationError);
        });

        it('should not throw error when owner authorized', async () => {
            await CommentsTableTestHelper.addComment({
                id: 'comment-1',
                content: 'text comment',
                thread: 'thread-1',
                owner: 'user-1',
            });

            const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, () => {});

            await expect(commentRepositoryPostgres.verifyOwner('comment-1', 'user-1'))
                .resolves.not.toThrowError(AuthorizationError);
        });
    });

    describe('deleteComment function', () => {
        it('should update deleted_at column with date now to deleted comment', async () => {
            await CommentsTableTestHelper.addComment({
                id: 'comment-1',
                content: 'text comment',
                thread: 'thread-1',
                owner: 'user-1',
            });

            const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, () => {});
            await commentRepositoryPostgres.deleteComment('comment-1');

            const deletedComment = await CommentsTableTestHelper.findCommentById('comment-1');
            expect(deletedComment[0].deleted_at).not.toBeNull();
        });
    });

    describe('getCommentsFromThread function', () => {
        it('should get all comment with given thread id', async () => {
            const payload = {
                id: 'comment-1',
                content: 'sebuah comment',
                owner: 'user-1',
                thread: 'thread-1',
            };

            CommentsTableTestHelper.addComment(payload);

            const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, () => {});
            const detailThread = await commentRepositoryPostgres.getCommentsFromThread('thread-1');

            expect(detailThread).toHaveLength(1);
            expect(detailThread[0].id).toStrictEqual(payload.id);
            expect(detailThread[0].content).toStrictEqual(payload.content);
            expect(detailThread[0].owner).toStrictEqual(payload.owner);
            expect(detailThread[0].thread_id).toStrictEqual(payload.thread);

            expect(detailThread[0]).toHaveProperty('created_at');
            expect(detailThread[0]).toHaveProperty('username');
            expect(detailThread[0]).toHaveProperty('deleted_at');
        });
    });
});
