import BaseProvider from '../base-provider';

class PartProvider extends BaseProvider {
    constructor() {
        super();
    }

    async getPartList(page, item, perPage) {
        const searchForm: string = this.buildUrl({'PartSearchForm': item }),
              expand: string[] = ['posting_price', 'amounts', 'barcodes', 'images'];  
        let res = await this.request('GET', `/part/index?page=${page}&expand=${expand}${searchForm}&per-page=${perPage}`);
        return {
            'data': res.data,
            'pageCount': res.headers['x-pagination-page-count'],
            'pageCurrent': res.headers['x-pagination-page-current'],
            'amountControl': res.headers['x-storage-amount-control']
        };
    }

    async getPartAmount(page, item, perPage) {
        const searchForm: string = this.buildUrl({'PartAmountSearchForm': item }),
              expand: string[] = ['part.posting_price'];  
        let res = await this.request('GET', `/partamount/index?page=${page}&expand=${expand}${searchForm}&per-page=${perPage}`);
        return {
            'data': res.data,
            'pageCount': res.headers['x-pagination-page-count'],
            'pageCurrent': res.headers['x-pagination-page-current'],
            'amountControl': res.headers['x-storage-amount-control']
        };
    }

    async getViewPart(id) {
        const expand: string[] = ['posting_price', 'amounts', 'barcodes', 'images'];
        let res = await this.request('GET', `/part/view?id=${id}&expand=${expand}`);
        return res;
    }

    async getVatList() {
        let res = await this.request('GET', `/part/vatlist`);
        return res;
    }

    async getWarrantTypeList() {
        let res = await this.request('GET', `/part/warranttypelist`);
        return res;
    }

    async getRewardTypeList() {
        let res = await this.request('GET', `/part/rewardtypelist`);
        return res;
    }

    async getBarcode() {
        let res = await this.request('GET', `/part/generatebarcode`);
        return res;
    }

    async getPartLogList(item) {
        let res = await this.request('GET', `/part/log?part_id=${item.part}&storage_id=${item.storage}&page=${item.page}`);
        return {
            'data': res.data,
            'pageCount': res.headers['x-pagination-page-count']
        };
    }

    async sendPart(item) {
        const data: object = { 'PartForm': item },
              expand: string[] = ['posting_price'];  
        let res = await this.request('POST', `/part/add?expand=${expand}`, data);
        return res;
    }

    async sendCopyPart(item) {
        const data: object = { 'PartCloneForm': item },
              expand: string[] = ['posting_price', 'amounts', 'barcodes', 'images'];
        let res = await this.request('POST', `/part/clone?expand=${expand}`, data);
        return res;
    }

    async sendPartImage(item) {
        const data = new FormData();
        data.append('PartImageUploadForm[part_id]', item.part_id);
        data.append('PartImageUploadForm[file]', item.file);
        let res = await this.request('POST', `/part/setimage`, data);
        return res;
    }

    async sendBarcode(item) {
        const data: object = { 'PartBarcode': item };
        let res = await this.request('POST', `/part/addbarcode`, data);
        return res;
    }

    async changePart(item) {
        const data: object = { 'Part' : item },
              expand: string[] = ['posting_price', 'amounts', 'barcodes', 'images'];
        let res = await this.request('POST', `/part/update?id=${item.id}&expand=${expand}`, data);
        return res;
    }

    async deleteBarcode(id) {
        let res = await this.request('POST', `/part/deletebarcode?id=${id}`);
        return res;
    }
}

export default new PartProvider();