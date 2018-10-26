import BaseProvider from '../base-provider';

class CancelProvider extends BaseProvider {
    constructor() {
        super();
    }

    async getCancelList(page) {
        const expand: string[] = ['total_sum', 'total_count', 'user', 'storage', 'provider'];
        let res = await this.request('GET', `/cancel/index?page=${page}&expand=${expand}`);
        return {
            'data': res.data,
            'pageCount': res.headers['x-pagination-page-count']
        };
    }

    async getViewCancel(id) {
        const expand: string[] = ['user', 'parts', 'penalty_user', 'storage', 'parts.part', 'parts.part.posting_price'];
        let res = await this.request('GET', `/cancel/view?id=${id}&expand=${expand}`);
        return {
            'data': res.data,
            'pageCount': res.headers['x-pagination-page-count']
        };
    }

    async sendCancel(item) {
        const data: object = { 'CancelForm' : item };
        let res = await this.request('POST', `/cancel/apply`, data);
        return res;
    }

    async sendRevert(item) {
        const data: object = { 'CancelRevertForm' : item };
        let res = await this.request('POST', `/cancel/revert`, data);
        return res;
    }

    async sendRevertPart(item) {
        const data: object = { 'CancelPartRevertForm' : item };
        let res = await this.request('POST', `/cancel/revertpart`, data);
        return res;
    }
}

export default new CancelProvider();