import Vue from 'vue';
import { Component, Watch, Prop } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

@Component({
    template: require('./index.html')
})
export class ClientCompanyForm extends Vue {

    @Action getInnClient;

    @Getter clientSource;
    @Getter clientInn;
    @Getter clientCompanyValid;

    @Prop() item: object;

    select(item) {
        this.item['address'] = item['address'];
        this.item['inn'] = item['inn'];
        this.item['kpp'] = item['kpp'];
        this.item['manager_name'] = item['manager_name'];
        this.item['manager_post'] = item['manager_post'];
        this.item['name'] = item['name'];
        this.item['ogrn'] = item['ogrn'];
        this.item['okpo'] = item['okpo'];
    }

    validate(obj, key) {
        if (Object.keys(obj).some(v => v === key)) {
            return obj[key][0];
        }
    }

    inn(queryString, cb) {
        const result: object[] = this.clientInn;
        cb(result);
    }

    @Watch('item.inn')
    onChange(val: string) {
        this.getInnClient(val);
    }
}