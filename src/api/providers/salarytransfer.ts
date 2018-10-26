import BaseProvider from '../base-provider';

class SalaryTransfer extends BaseProvider {
    
    constructor() {
        super();
        this.resource = '/salarytransfer';
    }
    
    async salaryTransferIndex(request) {
        const req = {
            method: 'GET',
            nestedResources: '/index',
            formName: 'SalaryTransferSearchForm',
            ...request,
        };
        let res = await this.superRequest(req);
        return {
            data: res.data,
        };
    }
    
    async salaryTransferView(request) {
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
    
    async salaryTransferAdd(request) {
        const req = {
            method: 'POST',
            nestedResources: '/add',
            formName: 'SalaryTransferCreateForm',
            ...request,
        };
        let res = await this.superRequest(req);
        return {
            data: res.data,
        };
    }
    
    async salaryTransferDelete(request) {
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

export default new SalaryTransfer();