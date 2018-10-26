import BaseProvider from '../base-provider';

class PostingProvider extends BaseProvider {
    constructor() {
        super();
    }

    async getPostingList(page) {
        const expand: string[] = ['total_sum', 'total_count', 'user', 'storage', 'provider'];
        let res = await this.request('GET', `/posting/index?page=${page}&expand=${expand}`);
        return {
            'data': res.data,
            'pageCount': res.headers['x-pagination-page-count']
        };
    }

    async getPostingView(id) {
        const expand: string[] = ['parts', 'user', 'storage', 'provider', 'parts.part.name'];
        let res = await this.request('GET', `/posting/view?id=${id}&expand=${expand}`);
        let parts = res.data.parts.map( i => {
            return { 
                'id': i['id'], 
                'name': i['part']['name'], 
                'part_id': i['part']['id'], 
                'amount': i['amount'], 
                'price': i['price'] };
        });
        res.data.parts = parts;
        return res;
    }

    async sendPosting(item) {
        const data: object = { 'PostingForm': item };
        let res = await this.request('POST', `/posting/create`, data);
        return res;
    }

    
    async sendPostingPart(item) {
        const expand: string[] = ['parts', 'user', 'storage', 'provider', 'parts.part.name'],
              data: object = { 'PostingPart': item };
        let res = await this.request('POST', `/posting/addpart?expand=${expand}`, data);
        // let parts = res.data.parts.map( i => {
        //     return { 
        //         'id': i['id'], 
        //         'name': i['part']['name'], 
        //         'part_id': i['id'], 
        //         'amount': i['amount'], 
        //         'price': i['price'] };
        // });
        // res.data.parts = parts;
        return res;
    }
    
    async changePostingPart(item) {
        const expand: string[] = ['part.name'],
              data: object = { 'PostingPart': item };
        let res = await this.request('POST', `/posting/updatepart?id=${item.id}&expand=${expand}`, data);
        return {
            'data': { 
                'id': res.data['id'], 
                'name': res.data['part']['name'], 
                'part_id': res.data['part']['id'], 
                'amount': res.data['amount'], 
                'price': res.data['price']
            }             
        };
    }

    async revertPosting(id: number) {
        return await this.request('POST', `/posting/revert?id=${id}`);
    }

    async revertPostingPart(id: number) {
        return await this.request('POST', `/posting/revertpart?id=${id}`);
    }
}

export default new PostingProvider();