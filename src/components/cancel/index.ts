import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import {Action, Getter} from 'vuex-class';

import { Numbers } from '../forms/numbers';

@Component({
    template: require('./cancel.html'),
    components: {
        'numbers': Numbers
    }
})
export class Cancel extends Vue {

    @Action getCancelList;
    @Action addBreadcrumb;
    @Action addActionBtn;

    @Getter cancel;
    @Getter cancelPageCount;

    loading: boolean = true;
    breadcrumb: object[] = [{ 'id': 1, 'section': 'Склад', 'link': '/part' }, { 'id': 2, 'section': 'Списания', 'link': null }];
    actionBtn: object[] = [{ 'id': 1, 'type': 'add', 'title': 'Новое списание', 'link': '/cancel/add', 'icon': 'fa-plus' }];


    mounted () {
        document.title = 'Списания товаров';
        this.getCancelList(1);
        this.addBreadcrumb(this.breadcrumb);
        this.addActionBtn(this.actionBtn);
    }

    destroyed() {
        this.addActionBtn([]);
    }

    loadPage(val) {
        this.loading = true;
        this.getCancelList(val);
    }

    date(value) {
        const options: object = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        const date: string = new Date(value * 1000).toLocaleString('ru-RU', options).replace(',', '');
        return date;
    }

    onView(row) {
        this.$router.push('/cancel/view/' + row.id);
    }

    @Watch('cancel')
    onLoad() {
        this.$nextTick(() => this.loading = false);
    }
}