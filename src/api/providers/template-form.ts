import BaseProvider from '../base-provider';

class TemplateFormProvider extends BaseProvider {
    constructor() {
        super();
    }

    async getTemplateForm() {
        let res = await this.request('GET', ``);
        return res;
    }
}

export default new TemplateFormProvider();