import BaseProvider from '../base-provider';

class TransferProvider extends BaseProvider {
    constructor() {
        super();
    }

    async getTransfer(page) {
        const expand: string[] = ['user', 'in_storage', 'out_storage'];
        let res = await this.request('GET', `/transfer/index?page=${page}&expand=${expand}`);
        return {
            'data': res.data,
            'pageCount': res.headers['x-pagination-page-count']
        };
    }

    async getViewTransfer(id) {
        const expand: string[] = ['part_transfers.part', 'in_storage', 'out_storage', 'user'];
        let res = await this.request('GET', `/transfer/view?id=${id}&expand=${expand}`);
        return res;
    }

    async sendTransfer(item) {
        const data: object = { 'StorageTransferForm': item };
        let res = await this.request('POST', `/transfer/apply`, data);
        return res;
    }

    async changeClientSource(item) {
        const data: object = { 'ClientSource' : item };
        let res = await this.request('POST', `/clientsource/update?id=${item.id}`, data);
        return res;
    }

    async deleteClientSource(id) {
        let res = await this.request('POST', `/clientsource/delete?id=${id}`);
        return res;
    }
}

export default new TransferProvider();