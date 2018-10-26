import BaseProvider from '../base-provider';

class SellProvider extends BaseProvider {
    constructor() {
        super();
    }

    async getSellList(page) {
        const expand: string[] = ['client', 'seller', 'payments', 
                                  'parts_total', 'parts_count', 'parts_reverts', 'parts.storage', 
                                  'works_total', 'works_count', 'works_reverts'];
                                  
        let res = await this.request('GET', `/sell/index?page=${page}&expand=${expand}`);
        return {
            'data': res.data,
            'pageCount': res.headers['x-pagination-page-count']
        };
    }

    async getViewSell(id) {
        const expand: string[] = ['client', 'seller', 'payments', 'discounts',
                                  'works.work', 'parts.storage', 'parts.part'];

        let res = await this.request('GET', `/sell/view?id=${id}$expand=${expand}`);
        return res;
    }

    async sendSell(item) {
        const expand: string[] = ['client', 'seller', 'payments', 'discounts',
                                  'works.work', 'parts.storage', 'parts.part'];

        const data: object = { 'SellCreateForm': item };
        let res = await this.request('POST', `/sell/create?expand=${expand}`, data);
        return res;
    }

    async sendSellPart(item) {
        const expand: string[] = ['part', 'seller'];
        const data: object = { 'SellPart': item };
        let res = await this.request('POST', `/sellpart/add?expand=${expand}`, data);
        return res;
    }

    async sendSellWork(id) {
        const expand: string[] = ['work', 'seller'];
        const data: object = { 'SellWork': { 'sell_id': id } };
        let res = await this.request('POST', `/sellwork/add?expand=${expand}`, data);
        return res;
    }

    async sendSellApply(item) {
        const expand: string[] = ['client', 'seller',  'payments', 'discounts',
                                  'works.work', 'parts.storage', 'parts.part'];

        const data: object = { 'SellApplyForm': item };
        let res = await this.request('POST', `/sell/apply?expand=${expand}`, data);
        return res;
    }

    async sendSellPayment(item) {
        const data: object = { 'SellPayment': item };
        let res = await this.request('POST', `/sellpayment/add`, data);
        return res;
    }

    async changSellPart(id, item) {
        const data: object = { 'SellPart' : item };
        let res = await this.request('POST', `/sellpart/update?id=${id}`, data);
        return res;
    }

    async deleteSell(id, item) {
        const data: object = { 'SellWork': { 'sell_id': id } };
        let res = await this.request('POST', `/sell/delete`, data);
        return res;
    }

    async deleteSellPart(id) {
        let res = await this.request('POST', `/sellpart/delete?id=${id}`);
        return res;
    }

    async deleteSellWork(id) {
        let res = await this.request('POST', `/sellwork/delete?id=${id}`);
        return res;
    }
}

export default new SellProvider();