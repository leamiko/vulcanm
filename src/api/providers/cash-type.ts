import BaseProvider from '../base-provider';

class CashTypeProvider extends BaseProvider {
    constructor() {
        super();
    }

    async getCashTypeList(page) {
        let res = await this.request('GET', `/cashtype/index?page=${page}`);
        return {
            'data': res.data,
            'pageCount': res.headers['x-pagination-page-count']
        };
    }

    async sendCashType(item) {
        const data: object = { 'CashType': item };
        let res = await this.request('POST', `/cashtype/add`, data);
        return res;
    }

    async changeCashType(item) {
        const data: object = { 'CashType' : item };
        let res = await this.request('POST', `/cashtype/update?id=${item.id}`, data);
        return res;
    }

    async deleteCashType(id) {
        let res = await this.request('POST', `/cashtype/delete?id=${id}`);
        return res;
    }
}

export default new CashTypeProvider();