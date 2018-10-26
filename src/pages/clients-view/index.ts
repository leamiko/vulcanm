import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

import { ViewUserName } from '../../components/forms/user-name';
import { NumberPhone } from '../../components/forms/number-phone';
import { Dialog } from 'element-ui';

@Component({
    template: require('./index.html'),
    components: {
        'user-name': ViewUserName,
        'phone': NumberPhone
    }
})
export class ClientsViewPage extends Vue {

    @Action getViewClient;
    @Action deleteClient;
    @Action addBreadcrumb;
    @Action addActionBtn;
    @Action changeClientPerson;
    @Action changeClientCompany;

    @Getter viewClient;
    @Getter btnloader;

    tableData: object[] = [];
    breadcrumb: object[] = [
        { 'id': 1, 'section': 'Компания', 'link': '/settings' },
        { 'id': 2, 'section': 'Клиенты', 'link': '/clients' }
    ];
    loading: boolean = true;
    dialogDelete: boolean = false;
    popSell: boolean = false;
    popRepair: boolean = false;
    newItem: object = {};

    mounted() {
        this.getViewClient(this.$route.params.id);
        this.addBreadcrumb(this.breadcrumb);
        this.addActionBtn([
            { 'id': 1, 'type': 'edt', 'title': 'Изменить', 'link': '/clients/edit/' + this.$route.params.id, 'icon': 'fa-edit' },
            { 'id': 2, 'type': 'del', 'title': 'Удалить', 'link': 'onDialog', 'icon': 'fa-times' },
        ]);
        this.$root.$on('onDialog', i => this.dialogDelete = true);
    }

    destroyed() {
        this.addActionBtn([]);
    }

    checkItem(item) {
        return item !== null && item !== '' ? true : false;
    }

    onItem() {
        this.newItem = JSON.parse(JSON.stringify(this.viewClient));
    }

    onDelete(item) {
        this.deleteClient(item.id).then( res => {
                this.dialogDelete = false;
                this.$router.push('/clients');
            });
    }

    editDiscount() {
        if (this.viewClient['type'] === 1) {
            this.changeClientPerson(this.newItem);
        } else if (this.viewClient['type'] === 2) {
            this.changeClientCompany(this.newItem);
        }
        this.popRepair = false;
        this.popSell = false;
    }

    @Watch('viewClient')
    onLoad(val: object) {
        const name = val['type'] === 1 ? val['last_name'] + ' ' + val['first_name'] + ' ' + val['middle_name'] : val['name'],
              item = { 'id': 3, 'section': name, 'link': null };  
        this.breadcrumb.push(item);
        this.addBreadcrumb(this.breadcrumb);
        this.$nextTick(() => this.loading = false);
    }

}