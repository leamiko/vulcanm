import BaseProvider from '../base-provider';

class RepairProvider extends BaseProvider {
    constructor() {
        super();
    }

    async getRepairList(page) {
        const expand: string[] = ['objects', 'client'];
        let res = await this.request('GET', `/repair/index?page=${page}&expand=${expand}`);
        return {
            'data': res.data,
            'pageCount': res.headers['x-pagination-page-count'],
            'pageCurrent': res.headers['x-pagination-page-current']
        };
    }

    async getViewRepair(id) {
        // const expand: string[] = ['objects', 'client'];
        let res = await this.request('GET', `/repair/view?id=${id}`);
        return res;
    }

}

export default new RepairProvider();