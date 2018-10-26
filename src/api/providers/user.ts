import BaseProvider from '../base-provider';

class UserProvider extends BaseProvider {
    constructor() {
        super();
    }

    async getUserMe(page) {
        let res = await this.request('GET', `/user/me`);
        return res;
    }

    
}

export default new UserProvider();