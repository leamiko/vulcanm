import BaseProvider from '../base-provider';

class UserStatusProvider extends BaseProvider {
    constructor() {
        super();
    }

    async getUserStatusList(page) {
        let res = await this.request('GET', `/repairstatus/index?page=${page}`);
        return {
            'data': res.data,
            'pageCount': res.headers['x-pagination-page-count']
        };
    }

    async sendUserStatus(item) {
        const data: object = { 'RepairStatus': item };
        let res = await this.request('POST', `/repairstatus/add`, data);
        return res;
    }

    async changeUserStatus(item) {
        const data: object = { 'RepairStatus' : item };
        let res = await this.request('POST', `/repairstatus/update?id=${item.id}`, data);
        return res;
    }

    async deleteUserStatus(id) {
        let res = await this.request('POST', `/repairstatus/delete?id=${id}`);
        return res;
    }
}

export default new UserStatusProvider();