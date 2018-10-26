import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { Action, Getter} from 'vuex-class';

import { ViewUserName } from '../../components/forms/user-name';
import { ViewDate } from '../../components/forms/date';
import { NumberPhone } from '../../components/forms/number-phone';

@Component({
    template: require('./index.html'),
    components: {
        'user-name': ViewUserName,
        'date': ViewDate,
        'phone': NumberPhone,
    }
})
export class SmsPages extends Vue {

    @Action getSmsList;
    @Action addBreadcrumb;
    @Action addActionBtn;

    @Getter sms;
    @Getter smsPageCount;

    loading: boolean = true;
    breadcrumb: object[] = [{ 'id': 1, 'section': 'Компания', 'link': '/settings' }, { 'id': 2, 'section': 'SMS', 'link': null }];
    actionbtn: object[] = [{ 'id': 1, 'type': 'add', 'title': 'Приобрести SMS', 'link': '/clients/add', 'icon': 'fa-plus' }];

    mounted() {
        this.getSmsList(1);
        this.addBreadcrumb(this.breadcrumb);
        this.addActionBtn(this.actionbtn);
    }

    loadPage(val) {
        this.loading = true;
        this.getSmsList(val);
    }

    @Watch('sms')
    onLoad() {
        window.scroll(0, 0);
        this.loading = false;
    }
}