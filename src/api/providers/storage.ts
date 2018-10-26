import BaseProvider from '../base-provider';

class StorageProvider extends BaseProvider {
    constructor() {
        super();
    }

    async getStorageList(page) {
        const expand: string[] = ['point'];
        let res = await this.request('GET', `/storage/index?page=${page}&expand=${expand}`);
        return {
            'data': res.data,
            'pageCount': res.headers['x-pagination-page-count']
        };
    }

    async getAvailableList(page) {
        let res = await this.request('GET', `/storage/availablelist?page=${page}`);
        return res;
    }

    async sendStorage(item) {
        const expand: string[] = ['point'];
        const data: object = { 'Storage': item };
        let res = await this.request('POST', `/storage/add?expand=${expand}`, data);
        return res;
    }

    async changeStorage(id, item) {
        const expand: string[] = ['point'];
        const data: object = { 'Storage' : item };
        let res = await this.request('POST', `/storage/update?id=${id}&expand=${expand}`, data);
        return res;
    }

    async deleteStorage(id) {
        let res = await this.request('POST', `/storage/delete?id=${id}`);
        return res;
    }
}

export default new StorageProvider();