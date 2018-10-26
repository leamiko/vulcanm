import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

import { ViewUserName } from '../../components/forms/user-name';
import { NumberPhone } from '../../components/forms/number-phone';

@Component({
    template: require('./index.html'),
    components: {
        'user-name': ViewUserName,
        'phone': NumberPhone,
    }
})
export class StuffPage extends Vue {

    @Action getStuffList;
    @Action addBreadcrumb;
    @Action addActionBtn;
    @Action deleteStuff;

    @Getter stuff;
    @Getter stuffPageCount;

    loading: boolean = true;
    dialogView: boolean = false;
    dialogLock: boolean = false;
    actionBtn: object[] = [{ 'id': 1, 'type': 'add', 'title': 'Новый сотрудник', 'link': '/stuff/add', 'icon': 'fa-plus' }];
    breadcrumb: object[] = [{ 'id': 1, 'section': 'Компания', 'link': '/settings' }, { 'id': 2, 'section': 'Сотрудники', 'link': null }];
    stuffView: object = {};

    mounted() {
        this.getStuffList(1);
        this.addBreadcrumb(this.breadcrumb);
        this.addActionBtn(this.actionBtn);
    }

    destroyed() {
        this.addBreadcrumb([]);
        this.addActionBtn([]);
    }

    loadPage(val) {
        this.loading = false;
        this.getStuffList(val);
    }

    getPoint(item) {
        return item.point === undefined ? '' : item.point.name;
    }

    onDialogLock(item) {
        this.stuffView = item;
        this.dialogLock = true;
    }

    @Watch('stuff')
    onLoad() {
        this.$nextTick( () => this.loading = false );
    }
}