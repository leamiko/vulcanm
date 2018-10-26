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
export class ClientsEditPage extends Vue {

    @Action addBreadcrumb;
    @Action getClientSourceList;
    @Action changeClientPerson;
    @Action changeClientCompany;
    @Action getViewClient;

    @Getter viewClient;
    @Getter btnloader;
    @Getter clientCompanyValid;
    @Getter clientPersonValid;

    breadcrumb: object[] = [
        { 'id': 1, 'section': 'Компания', 'link': '/settings' },
        { 'id': 2, 'section': 'Клиенты', 'link': '/clients' },
        { 'id': 3, 'section': 'Изменение', 'link': null }
    ];
    loading: boolean = true;

    mounted() {
        this.getViewClient(this.$route.params.id);
        this.getClientSourceList(1);
        this.addBreadcrumb(this.breadcrumb);
    }

    @Watch('clientCompanyValid')
    onChangeCompany(val: object) {
        if (!Object.keys(val).length) this.$router.push('/clients');
    }

    @Watch('clientPersonValid')
    onChangePerson(val: object) {
        if (!Object.keys(val).length) this.$router.push('/clients');
    }

    @Watch('viewClient')
    onLoad(val: object) {
        this.$nextTick(() => this.loading = false);
    }
}