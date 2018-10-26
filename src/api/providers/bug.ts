import BaseProvider from '../base-provider';

class BugProvider extends BaseProvider {
    constructor() {
        super();
    }

    async signIn(item) {
        const data: object = { 'LoginForm': item };
        let res = await this.request('POST', `/site/login`, data);
        return res;
    }
}

export default new BugProvider();