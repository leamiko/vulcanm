import BaseProvider from '../base-provider';

class WorkProvider extends BaseProvider {
    constructor() {
        super();
    }

    async getWorkList(page) {
        let res = await this.request('GET', `/work/index?page=${page}`);
        return {
            'data': res.data,
            'pageCount': res.headers['x-pagination-page-count']
        };
    }

    async getWorkSearchList(page, item, perPage) {
        const searchForm: string = this.buildUrl({'UniversalWorkSearchForm': item });
        let res = await this.request('GET', `/work/index?page=${page}${searchForm}&per-page=${perPage}`);
        return {
            'data': res.data,
            'pageCount': res.headers['x-pagination-page-count']
        };
    }

}

export default new WorkProvider();