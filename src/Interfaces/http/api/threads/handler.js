const AddThreadUseCase = require('../../../../Applications/use_case/threads/AddThreadUseCase');
const GetDetailThreadUseCase = require('../../../../Applications/use_case/threads/GetDetailThreadUseCase');

class ThreadsHandler {
    constructor(container) {
        this._container = container;

        this.postThreadHandler = this.postThreadHandler.bind(this);
        this.getThreadDetailHandler = this.getThreadDetailHandler.bind(this);
    }

    async postThreadHandler(request, h) {
        const { id: userId } = request.auth.credentials;

        const addThreadUseCase = this._container.getInstance(AddThreadUseCase.name);
        const addedThread = await addThreadUseCase.execute({
            ...request.payload,
            owner: userId,
        });

        const response = h.response({
            status: 'success',
            data: {
                addedThread,
            },
        });
        response.code(201);
        return response;
    }

    async getThreadDetailHandler(request, h) {
        const { threadId } = request.params;

        const getDetailThreadUseCase = this._container.getInstance(GetDetailThreadUseCase.name);
        const thread = await getDetailThreadUseCase.execute(threadId);

        return h.response({
            status: 'success',
            data: {
                thread,
            },
        });
    }
}

module.exports = ThreadsHandler;
