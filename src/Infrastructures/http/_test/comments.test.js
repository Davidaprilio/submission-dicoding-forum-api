const pool = require('../../database/postgres/pool');
const createServer = require('../createServer');
const container = require('../../container');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');

let server = '';
let threadId = '';
let commentId = '';
let userAccessToken = '';
let secondUserAccessToken = '';

describe('/comments endpoint', () => {

    beforeAll(async () => {
        server = await createServer(container);
        await server.inject({
            method: 'POST',
            url: '/users',
            payload: {
                username: 'dicoding',
                password: 'secret',
                fullname: 'Dicoding Indonesia',
            },
        });
        await server.inject({
            method: 'POST',
            url: '/users',
            payload: {
                username: 'dicodingsecond',
                password: 'secret',
                fullname: 'Dicoding Indonesia Second',
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
        const loginOtherUserResponse = await server.inject({
            method: 'POST',
            url: '/authentications',
            payload: {
                username: 'dicodingsecond',
                password: 'secret',
            },
        });
        const jsonUser1 = JSON.parse(loginResponse.payload);
        userAccessToken = jsonUser1.data.accessToken
        
        const jsonUser2 = JSON.parse(loginOtherUserResponse.payload);
        secondUserAccessToken = jsonUser2.data.accessToken

        const reponseThread = await server.inject({
            method: 'POST',
            url: '/threads',
            payload: {
                title: 'thread abc',
                body: 'thread abc ...',
            },
            headers: {
                authorization: `Bearer ${userAccessToken}`,
            },
        });

        const {data: { addedThread }} = JSON.parse(reponseThread.payload);
        
        threadId = addedThread.id
    })

    afterAll(async () => {
        await UsersTableTestHelper.cleanTable();
        await pool.end();
    });

    describe('when POST /threads/{threadId}/comments', () => {
        it('should response 201 and new thread', async () => {
            const response = await server.inject({
                method: 'POST',
                url: `/threads/${threadId}/comments`,
                payload: {
                    content: "text comment..."
                },
                headers: {
                    authorization: `Bearer ${userAccessToken}`,
                },
            });

            const responseJson = JSON.parse(response.payload);

            expect(response.statusCode).toEqual(201);
            expect(responseJson.status).toEqual('success');
            expect(responseJson.data.addedComment).toBeDefined();
            commentId = responseJson.data.addedComment.id
        });
    });

    describe('when DELETE /threads/{threadId}/comments/{commentId}', () => {
        it('should response 403 when owner unauthorized', async () => {
            const response = await server.inject({
                method: 'DELETE',
                url: `/threads/${threadId}/comments/${commentId}`,
                headers: {
                    authorization: `Bearer ${secondUserAccessToken}`,
                },
            });

            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(403);
            expect(responseJson.status).toEqual('fail');
            expect(responseJson.message).toBeDefined();
        });

        it('should response 404 when comment not found', async () => {
            const response = await server.inject({
                method: 'DELETE',
                url: `/threads/${threadId}/comments/comment-0`,
                headers: {
                    authorization: `Bearer ${userAccessToken}`,
                },
            });

            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(404);
            expect(responseJson.status).toEqual('fail');
            expect(responseJson.message).toBeDefined();
        });

        it('should response 200 when deleted comment', async () => {
            
            const response = await server.inject({
                method: 'DELETE',
                url: `/threads/${threadId}/comments/${commentId}`,
                headers: {
                    authorization: `Bearer ${userAccessToken}`,
                },
            });

            const responseJson = JSON.parse(response.payload);

            expect(response.statusCode).toEqual(200);
            expect(responseJson.status).toEqual('success');
        });
    });
});