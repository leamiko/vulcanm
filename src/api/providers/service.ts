import BaseProvider from '../base-provider';

class ServiceProvider extends BaseProvider {
    constructor() {
        super();
    }

    async getLicenseList(page) {
        const expand: string[] = ['tariff'];
        let res = await this.request('GET', `/service/licenselist?page=${page}&expand=${expand}`);
        return {
            'data': res.data,
            'pageCount': res.headers['x-pagination-page-count']
        };
    }

    async getPaymentList(page) {
        const expand: string[] = ['tariff'];
        let res = await this.request('GET', `/service/paymentlist?page=${page}`);
        return {
            'data': res.data,
            'pageCount': res.headers['x-pagination-page-count']
        };
    }

}

export default new ServiceProvider();