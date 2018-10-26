import BaseProvider from '../base-provider';

class SalaryOperation extends BaseProvider {
    
    constructor() {
        super();
        this.resource = '/salaryoperation';
    }
    
    async salaryOperationIndex(request) {
        const req = {
            method: 'GET',
            nestedResources: '/index',
            formName: 'SalaryOperationSearchForm',
            ...request,
        };
        let res = await this.superRequest(req);
        return {
            data: res.data,
            pageCount: res.headers['x-pagination-page-count'],
            total: res.headers['x-pagination-total-count'],
            currentPage: res.headers['x-pagination-current-page'],
            links: res.headers['link'],
        };
    }
    
    async salaryOperationView(request) {
        let req = {
            method: 'GET',
            nestedResources: '/view',
            ...request,
        };
        let res = await this.superRequest(req);
        return {
            data: res.data,
        };
    }
    
    async salaryOperationBonus(request) {
        const req = {
            method: 'POST',
            nestedResources: '/bonus',
            formName: 'SalaryBonusForm',
            ...request,
        };
        let res = await this.superRequest(req);
        return {
            data: res.data,
        };
    }
    
    async salaryOperationPenalty(request) {
        let req = {
            method: 'POST',
            nestedResources: '/penalty',
            formName: 'SalaryPenaltyForm',
            ...request,
        };
        let res = await this.superRequest(req);
        return {
            data: res.data,
        };
    }
    
    async salaryOperationUpdate(request) {
        let req = {
            method: 'POST',
            nestedResources: '/update',
            formName: 'SalaryOperation',
            ...request,
        };
        let res = await this.superRequest(req);
        return {
            data: res.data,
        };
    }
    
    async salaryOperationDelete(request) {
        let req = {
            method: 'POST',
            nestedResources: '/delete',
            ...request,
        };
        let res = await this.superRequest(req);
        return {
            data: res.data,
        };
    }
}

export default new SalaryOperation();