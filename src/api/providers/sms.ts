import BaseProvider from '../base-provider';

class SmsProvider extends BaseProvider {
    constructor() {
        super();
    }

    async getSmsList(page) {
        let res = await this.request('GET', `/sms/index?page=${page}`);
        return {
            'data': res.data,
            'pageCount': res.headers['x-pagination-page-count']
        };
    }

    async getSmsTemplateList() {
        let res = await this.request('GET', `/service/smstemplates`);
        return res;
    }

    async changeSmsTemplate(item) {
        const data: object = { 'SmsTemplateForm': item };
        let res = await this.request('POST', `/service/smstemplates`, data);
        return res;
    }
}

export default new SmsProvider();