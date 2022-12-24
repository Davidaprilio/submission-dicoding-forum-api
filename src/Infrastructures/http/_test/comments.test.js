const pool = require('../../database/postgres/pool');
const createServer = require('../createServer');
const container = require('../../container');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');

describe('/comments endpoint', () => {

    afterEach(async () => {
        await UsersTableTestHelper.cleanTable();
    });
    
    afterAll(async () => {
        await pool.end();
    });

    describe('when POST /threads/{threadId}/comments', () => {
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

            const reponseThread = await server.inject({
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

            const {data: { addedThread }} = JSON.parse(reponseThread.payload);
            
            const response = await server.inject({
                method: 'POST',
                url: `/threads/${addedThread.id}/comments`,
                payload: {
                    content: "text comment..."
                },
                headers: {
                    authorization: `Bearer ${accessToken}`,
                },
            });

            const responseJson = JSON.parse(response.payload);

            expect(response.statusCode).toEqual(201);
            expect(responseJson.status).toEqual('success');
            expect(responseJson.data.addedComment).toBeDefined();
        });
    });
});