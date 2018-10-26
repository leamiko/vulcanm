import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

import { Licenses } from '../../components/licenses';
import { Payments } from '../../components/payments';

@Component({
    template: require('./index.html'),
    components: {
        'licenses': Licenses,
        'payments': Payments
    }
})
export class LicensesPage extends Vue {

    @Action addBreadcrumb;
    @Action addActionBtn;

    breadcrumb: object[] = [{ 'id': 1, 'section': 'Компания', 'link': '/settings' }, { 'id': 2, 'section': 'Лицензии', 'link': null }];
    actionbtn: object[] = [{ 'id': 1, 'type': 'add', 'title': 'Приобрести лицензию', 'link': '/clients/add', 'icon': 'fa-plus' }];

    mounted() {
        this.addBreadcrumb(this.breadcrumb);
        this.addActionBtn(this.actionbtn);
    }
}