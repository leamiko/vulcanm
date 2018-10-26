import BaseProvider from '../base-provider';

class StuffProvider extends BaseProvider {
    constructor() {
        super();
    }

    async getStuffList(page?) {
        const expand: string[] = ['point'];
        let res;
        if (page) {
            res = await this.request(
                'GET', `/service/stuff?page=${page}&expand=${expand}`);
        } else {
            res = await this.request(
                'GET', `/service/stuff?expand=${expand}`);
        }
        return {
            'data': res.data,
            'pageCount': res.headers['x-pagination-page-count']
        };
    }

    async getViewStuff(id) {
        const expand: string[] = ['rights'];
        let res = await this.request('GET', `/service/employee?id=${id}&expand=${expand}`);
        return {
            'data': res.data
        };
    }

    async sendStuff(item) {
        const expand: string[] = ['rights'];
        const data: object = { 'UserForm': item };
        let res = await this.request('POST', `/service/addemployee?expand=${expand}`, data);
        return res;
    }

    async changeStuff(id, item) {
        const expand: string[] = ['rights'];
        const data: object = { 'UserForm' : item };
        let res = await this.request('POST', `/service/updateemployee?id=${id}&expand=${expand}`, data);
        return res;
    }

    async deleteStuff(id) {
        let res = await this.request('POST', `/service/fireemployee?id=${id}`);
        return res;
    }
    
    async getSalaryPeriodTypeList() {
        return {
            data: {
                1: 'дневной',
                2: 'месячный',
            }
        };
    }
    
    async getSellPartSalaryTypeList() {
        return {
            data: {
                0: 'ден.ед',
                1: '% от стоимости',
                2: '% от прибыли',
            }
        };
    }
    
    async getRepairPartSalaryType() {
        return {
            data: {
                0: 'ден.ед',
                1: '% от стоимости',
                2: '% от прибыли',
            }
        };
    }
    
}

export default new StuffProvider();