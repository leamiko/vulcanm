import BaseProvider from '../base-provider';

class ReportProvider extends BaseProvider {
    constructor() {
        super();
    }

    async getEconomy(start: string, end: string, cashbox_ids: number[]) {
        const expand: string[] = ['items.custom_type'];
        let res = await this.request('GET', `/report/economy?start=${start}&end=${end}&cashbox_ids=${(cashbox_ids !== null && cashbox_ids.length > 0) ? cashbox_ids.join(',') : ''}&expand=${expand}`);
        return {
            'data': res.data
        };
    }

}

export default new ReportProvider();