import BaseProvider from '../base-provider';

class CashProvider extends BaseProvider {
    constructor() {
        super();
    }

    async getCashList(page) {
        const expand: string[] = ['sum', 'point'];
        let res = await this.request('GET', `/cashbox/index?page=${page}&expand=${expand}`);
        return {
            'data': res.data,
            'pageCount': res.headers['x-pagination-page-count']
        };
    }

    async getCashOperation(page, item) {
        const expand: string[] = ['cashbox_sum_after', 'creator', 'cashbox'], 
              searchForm: string = this.buildUrl({'CashOperationSearchForm': item });
        let res = await this.request('GET', `/cashoperation/index?page=${page}&expand=${expand}${searchForm}`);
        return {
            'data': res.data,
            'pageCount': res.headers['x-pagination-page-count'],
            'countIn': res.headers['x-cashoperations-total-in'],
            'countOut': res.headers['x-cashoperations-count-out'],
            'totalIn': res.headers['x-cashoperations-total-in'],
            'totalOut': res.headers['x-cashoperations-total-out']
        };
    }

    async changeCashItem(item) {
        const data: object = { 'Cashbox' : item };
        const expand: string[] = ['sum', 'point'];
        let res = await this.request('POST', `/cashbox/update?id=${item.id}`, data);
        return res;
    }

    async deleteCashItem(id) {
        let res = await this.request('POST', `/cashbox/delete?id=${id}`);
        return res;
    }
}

export default new CashProvider();