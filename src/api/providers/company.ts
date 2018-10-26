import BaseProvider from '../base-provider';

class CompanyProvider extends BaseProvider {
    constructor() {
        super();
    }

    async getCompanyInfo() {
        let res = await this.request('GET', `/clientsource/index`);
        return {
            'data': res.data,
            'pageCount': res.headers['x-pagination-page-count']
        };
    }

    async changeCompanyInfo(item) {
        const data: object = { 'ClientSource' : item };
        let res = await this.request('POST', `/clientsource/update?id=${item.id}`, data);
        return res;
    }
}

export default new CompanyProvider();