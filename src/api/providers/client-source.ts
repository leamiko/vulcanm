import BaseProvider from '../base-provider';

class ClientSourceProvider extends BaseProvider {
    constructor() {
        super();
    }

    async getClientSourceList(page) {
        let res = await this.request('GET', `/clientsource/index?page=${page}`);
        return {
            'data': res.data,
            'pageCount': res.headers['x-pagination-page-count']
        };
    }

    async sendClientSource(item) {
        const data: object = { 'ClientSource': item };
        let res = await this.request('POST', `/clientsource/add`, data);
        return res;
    }

    async changeClientSource(item) {
        const data: object = { 'ClientSource' : item };
        let res = await this.request('POST', `/clientsource/update?id=${item.id}`, data);
        return res;
    }

    async deleteClientSource(id) {
        let res = await this.request('POST', `/clientsource/delete?id=${id}`);
        return res;
    }
}

export default new ClientSourceProvider();