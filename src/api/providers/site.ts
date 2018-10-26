import BaseProvider from '../base-provider';

class SiteProvider extends BaseProvider {
    constructor() {
        super();
    }


    async index() {
        return await this.request('GET', '/site/index');
    }
}

export default new SiteProvider();