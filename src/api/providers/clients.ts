import BaseProvider from '../base-provider';

class ClientsProvider extends BaseProvider {
    constructor() {
        super();
    }

    async getClientList(page) {
        let res = await this.request('GET', `/client/index?page=${page}`);
        return {
            'data': res.data,
            'pageCount': res.headers['x-pagination-page-count']
        };
    }

    async getViewClient(id) {
        let res = await this.request('GET', `/client/view?id=${id}`);
        return res;
    }

    async filterClient(page, item) {
        const searchForm: string = this.buildUrl({'ClientSearchForm': item });
        let res = await this.request('GET', `/client/index?page=${page}${searchForm}`);
        return {
            'data': res.data,
            'pageCount': res.headers['x-pagination-page-count']
        };
    }

    async getInnClient(inn) {
        let res = await this.request('GET', `/client/findinn?inn=${inn}`);
        return res;
    }

    async sendClientPerson(item) {
        const data: object = { 'ClientPerson': item };
        let res = await this.request('POST', `/client/addperson`, data);
        return res;
    }

    async sendClientCompany(item) {
        const data: object = { 'ClientCompany': item };
        let res = await this.request('POST', `/client/addcompany`, data);
        return res;
    }

    async changeClientPerson(item) {
        const data: object = { 'ClientPerson': item };
        let res = await this.request('POST', `/client/updateperson?id=${item.id}`, data);
        return res;
    }

    async changeClientCompany(item) {
        const data: object = { 'ClientCompany': item };
        let res = await this.request('POST', `/client/updatecompany?id=${item.id}`, data);
        return res;
    }

    async deleteClient(id) {
        let res = await this.request('POST', `/client/delete?id=${id}`);
        return res;
    }
}

export default new ClientsProvider();