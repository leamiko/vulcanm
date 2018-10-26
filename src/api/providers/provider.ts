import BaseProvider from '../base-provider';

class ProviderProvider extends BaseProvider {
    constructor() {
        super();
    }

    async getProviderList(page) {
        let res = await this.request('GET', `/provider/index?page=${page}`);
        return {
            'data': res.data,
            'pageCount': res.headers['x-pagination-page-count']
        };
    }

    async getViewProvider(id) {
        let res = await this.request('GET', `/provider/view?id=${id}`);
        return res;
    }

    async sendProvider(item) {
        const data: object = { 'Provider': item };
        let res = await this.request('POST', `/provider/add`, data);
        return res;
    }

    async changeProvider(id, item) {
        const data: object = { 'Provider' : item };
        let res = await this.request('POST', `/provider/update?id=${id}`, data);
        return res;
    }

    async deleteProvider(id) {
        let res = await this.request('POST', `/provider/delete?id=${id}`);
        return res;
    }
}

export default new ProviderProvider();