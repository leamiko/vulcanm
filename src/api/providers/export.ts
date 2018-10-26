import BaseProvider from '../base-provider';

class ExportProvider extends BaseProvider {
    constructor() {
        super();
    }

    async getExportList(page) {
        let res = await this.request('GET', `/export/index?page=${page}`);
        return {
            'data': res.data,
            'pageCount': res.headers['x-pagination-page-count']
        };
    }

    async requestRepairExport(email: string) {
        let data =  {
            'RepairExportForm': {
                'email': email
            }
        };
        return await this.request('POST', '/export/repairs', data);
    }
}

export default new ExportProvider();