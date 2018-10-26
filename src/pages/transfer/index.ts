import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

import { TransferView } from '../../components/transfer-view';
import { Numbers } from '../../components/forms/numbers';
import { ViewUserName } from '../../components/forms/user-name';
import { ViewDate } from '../../components/forms/date';

@Component({
    template: require('./index.html'),
    components: {
        'transfer-view': TransferView,
        'numbers': Numbers,
        'user-name': ViewUserName,
        'date': ViewDate
    }
})
export class TransferPage extends Vue {

    @Action getTransfer;
    @Action addBreadcrumb;
    @Action addActionBtn;

    @Getter transfer;
    @Getter viewTransfer;
    @Getter transferPageCount;

    dialogDetail: boolean = false;
    loading: boolean = true;
    breadcrumb: object[] = [{ 'id': 1, 'section': 'Склад', 'link': '/part' }, { 'id': 2, 'section': 'Перемещения между складами', 'link': null }];
    actionBtn: object[] = [{ 'id': 1, 'type': 'add', 'title': 'Новое перемещение', 'link': '/storage/transfer/add', 'icon': 'fa-plus' }];

    mounted() {
        document.title = 'Перемещения между складами';
        this.getTransfer(1);
        this.addBreadcrumb(this.breadcrumb);
        this.addActionBtn(this.actionBtn);
    }

    destroyed() {
        this.addActionBtn([]);
    }

    date(value) {
        const options: object = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        const date: string = new Date(value * 1000).toLocaleString('ru-RU', options).replace(',', '');
        return date;
    }

    loadPage(val) {
        this.loading = true;
        this.getTransfer(val);
    }

    itemId: number = 1;
    itemDate: string = '';

    onDialogDetail(row) {
        this.itemId = row.id;
        this.itemDate = this.date(row.created_at);
        this.dialogDetail = true;
    }

    // get viewTransf() {
    //     return new Array(this.viewTransfer);
    // }

    @Watch('transfer')
    onLoad() {
        this.$nextTick(() => this.loading = false);
    }

}