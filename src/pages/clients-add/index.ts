import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

import { ClientUserForm } from '../../components/client-user-form';
import { ClientCompanyForm } from '../../components/client-company-form';

@Component({
    template: require('./index.html'),
    components: {
        'client-user-form': ClientUserForm,
        'client-company-form': ClientCompanyForm
    }
})
export class ClientsAddPage extends Vue {

    @Action addBreadcrumb;
    @Action getClientSourceList;
    @Action sendClientPerson;
    @Action sendClientCompany;

    @Getter btnloader;
    @Getter clientPersonValid;
    @Getter clientCompanyValid;

    breadcrumb: object[] = [
        { 'id': 1, 'section': 'Компания', 'link': '/settings' },
        { 'id': 2, 'section': 'Клиенты', 'link': '/clients' },
        { 'id': 3, 'section': 'Новый клиент', 'link': null }
    ];
    activeType: string = '1';
    user: object = {};
    company: object = {};

    mounted() {
        this.getClientSourceList(1);
        this.addBreadcrumb(this.breadcrumb);
    }

    @Watch('clientCompanyValid')
    onChangePerson(val: object) {
        if (!Object.keys(val).length) this.$router.push('/clients');
    }

    @Watch('clientPersonValid')
    onChangeCompany(val: object) {
        if (!Object.keys(val).length) this.$router.push('/clients');
    }

}