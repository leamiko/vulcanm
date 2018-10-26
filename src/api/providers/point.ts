import BaseProvider from '../base-provider';

class PointProvider extends BaseProvider {
    constructor() {
        super();
    }

    async getPointList(page) {
        const expand: string[] = ['type_name, cash_sum'];
        let res = await this.request('GET', `/point/index?page=${page}&expand=${expand}`);
        return {
            'data': res.data,
            'pageCount': res.headers['x-pagination-page-count']
        };
    }

    async getViewPoint(id) {
        let res = await this.request('GET', `/point/view?id=${id}`);
        return {
            'data': res.data,
            'pageCount': res.headers['x-pagination-page-count']
        };
    }

    async sendPoint(item) {
        const data: object = { 'Point': item };
        let res = await this.request('POST', `/point/add`, data);
        return res;
    }

    async changePoint(id, item) {
        const data: object = { 'Point' : item };
        let res = await this.request('POST', `/point/update?id=${id}`, data);
        return res;
    }

    async deletePoint(id) {
        let res = await this.request('POST', `/point/delete?id=${id}`);
        return res;
    }
}

export default new PointProvider();