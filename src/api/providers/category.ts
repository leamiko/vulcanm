import BaseProvider from '../base-provider';

class CategoryProvider extends BaseProvider {
    constructor() {
        super();
    }

    async getPartCategory() {
        let res = await this.request('GET', `/partcategory/getastree`);
        return {
            'data': res.data[0].children
        };
    }

    async getWorkCategory() {
        let res = await this.request('GET', `/workcategory/getastree`);
        return {
            'data': res.data[0].children
        };
    }

    async sendPartCategory(item) {
        const data: object = { 'CashType': item };
        let res = await this.request('POST', `/partcategory/add`, data);
        return res;
    }

    async sendWorkCategory(item) {
        const data: object = { 'CashType': item };
        let res = await this.request('POST', `/partcategory/add`, data);
        return res;
    }

    async changePartCategory(item) {
        const data: object = { 'Cashbox' : item };
        let res = await this.request('POST', `/cashtype/update?id=${item.id}`, data);
        return res;
    }

    async changeWorkCategory(item) {
        const data: object = { 'Cashbox' : item };
        let res = await this.request('POST', `/cashtype/update?id=${item.id}`, data);
        return res;
    }

    async deletePartCategory(id) {
        let res = await this.request('POST', `/cashtype/delete?id=${id}`);
        return res;
    }

    async deleteWorkCategory(id) {
        let res = await this.request('POST', `/cashtype/delete?id=${id}`);
        return res;
    }
}

export default new CategoryProvider();