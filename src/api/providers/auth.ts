import BaseProvider from '../base-provider';

class AuthProvider extends BaseProvider {
    constructor() {
        super();
    }

    async signIn(item) {
        const data: object = { 'LoginForm': item };
        let res = await this.request('POST', `/site/login`, data);
        return res;
    }
}

export default new AuthProvider();