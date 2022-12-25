const pool = require('../../database/postgres/pool');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const ThreadRepositoryPostgres = require('../ThreadRepositoryPostgres');
const AddThread = require('../../../Domains/threads/entities/AddThread');
const AddedThread = require('../../../Domains/threads/entities/AddedThread');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const DetailThread = require('../../../Domains/threads/entities/DetailThread');

describe('ThreadRepositoryPostgres', () => {

    beforeEach(async () => {
        await UsersTableTestHelper.addUser({
            id: 'user-1',
            username: 'dicoding', 
            password: 'secret', 
            fullname: 'Dicoding Indonesia'
        });
    });

    afterEach(async () => {
        await UsersTableTestHelper.cleanTable();
    });

    afterAll(async () => {
        await pool.end();
    });

    describe('addThread function', () => {
        it('should persist add thread', async () => {
            const addThread = new AddThread({
                title: 'thread title',
                body: 'thread body',
                owner: 'user-1',
            });

            const fakeIdGenerator = () => '123'; // stub!
            const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

            await threadRepositoryPostgres.addThread(addThread);

            const threads = await ThreadsTableTestHelper.findThreadById('thread-123');
            expect(threads).toHaveLength(1);
        });

        it('should return added thread correctly', async () => {
            const addThread = new AddThread({
                title: 'thread title',
                body: 'thread body',
                owner: 'user-1',
            });

            const fakeIdGenerator = () => '123'; // stub!
            const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

            const addedThread = await threadRepositoryPostgres.addThread(addThread);

            expect(addedThread).toStrictEqual(new AddedThread({
                id: 'thread-123',
                title: addThread.title,
                owner: addThread.owner,
            }));
        });
    });

    describe('getThreadById function', () => {
        it('should throw NotFoundError when thread not found', async () => {
            const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, () => {});
            await expect(threadRepositoryPostgres.getThreadById('thread-0')).rejects.toThrowError(NotFoundError);
        });

        it('should return thread data if exist', async () => {
            const addThread = new AddThread({
                title: 'thread title',
                body: 'thread body',
                owner: 'user-1',
            });

            const fakeIdGenerator = () => '123'; // stub!
            const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

            await threadRepositoryPostgres.addThread(addThread);

            const detailThread = await threadRepositoryPostgres.getThreadById('thread-123')
            expect(detailThread.id).toEqual('thread-123')
            expect(detailThread.title).toEqual(addThread.title)
            expect(detailThread.body).toEqual(addThread.body)
            expect(detailThread.owner).toEqual(addThread.owner)
            expect(detailThread).toHaveProperty('username')
            expect(detailThread).toHaveProperty('created_at')
        });
    });
});