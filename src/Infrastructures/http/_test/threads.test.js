const pool = require('../../database/postgres/pool');
const createServer = require('../createServer');
const container = require('../../container');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');

describe('/threads endpoint', () => {

    afterEach(async () => {
        await UsersTableTestHelper.cleanTable();
    });
    
    afterAll(async () => {
        await pool.end();
    });

    describe('when POST /threads', () => {
        it('should response 201 and new thread', async () => {
            const server = await createServer(container);

            await server.inject({
                method: 'POST',
                url: '/users',
                payload: {
                    username: 'dicoding',
                    password: 'secret',
                    fullname: 'Dicoding Indonesia',
                },
            });

            const loginResponse = await server.inject({
                method: 'POST',
                url: '/authentications',
                payload: {
                    username: 'dicoding',
                    password: 'secret',
                },
            });

            const { data: { accessToken } } = JSON.parse(loginResponse.payload);

            const requestPayload = {
                title: 'thread abc',
                body: 'thread abc ...',
            };

            const response = await server.inject({
                method: 'POST',
                url: '/threads',
                payload: requestPayload,
                headers: {
                    authorization: `Bearer ${accessToken}`,
                },
            });

            const responseJson = JSON.parse(response.payload);

            expect(response.statusCode).toEqual(201);
            expect(responseJson.status).toEqual('success');
            expect(responseJson.data.addedThread).toBeDefined();
        });
    });

    describe('when GET /threads/{threadId}', () => {
        it('should response 404 if thread not found', async () => {
            const server = await createServer(container);

            const response = await server.inject({
                method: 'GET',
                url: `/threads/thread-0`,
            });
            const responseJson = JSON.parse(response.payload);

            expect(response.statusCode).toEqual(404);
            expect(responseJson.status).toEqual('fail');
            expect(responseJson.message).toBeDefined();
        })

        it('should response 200 and new thread', async () => {
            const server = await createServer(container);

            await server.inject({
                method: 'POST',
                url: '/users',
                payload: {
                    username: 'dicoding',
                    password: 'secret',
                    fullname: 'Dicoding Indonesia',
                },
            });

            const loginResponse = await server.inject({
                method: 'POST',
                url: '/authentications',
                payload: {
                    username: 'dicoding',
                    password: 'secret',
                },
            });
            const { data: { accessToken } } = JSON.parse(loginResponse.payload);

            const responseAddThread = await server.inject({
                method: 'POST',
                url: '/threads',
                payload: {
                    title: 'thread abc',
                    body: 'thread abc ...',
                },
                headers: {
                    authorization: `Bearer ${accessToken}`,
                },
            });
            const {data: { addedThread }} = JSON.parse(responseAddThread.payload);

            const response = await server.inject({
                method: 'GET',
                url: `/threads/${addedThread.id}`,
            });
            const responseJson = JSON.parse(response.payload);

            expect(response.statusCode).toEqual(200);
            expect(responseJson.status).toEqual('success');
            expect(responseJson.data.thread).toBeDefined();
            expect(responseJson.data.thread.comments).toBeDefined();
        });
    });
});