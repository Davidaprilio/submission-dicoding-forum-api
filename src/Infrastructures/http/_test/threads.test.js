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
});