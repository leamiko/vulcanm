import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

import { Numbers } from '../forms/numbers';

@Component({
    template: require('./index.html'),
    components: {
        'numbers': Numbers
    }
})
export class Sell extends Vue {

    @Action addBreadcrumb;
    @Action addActionBtn;
    @Action getSellList;

    @Getter shop;
    @Getter shopPageCount;

    loading: boolean = true;
    breadcrumb: object[] = [{ 'id': 1, 'section': 'Магазин', 'link': '/sell' }, { 'id': 2, 'section': 'Продажи магазина', 'link': null }];
    actionBtn: object[] = [{ 'id': 1, 'type': 'add', 'title': 'Новая продажа', 'link': '/sell/add', 'icon': 'fa-plus' }];

    mounted() {
        document.title = 'Продажи магазина';
        this.getSellList(1);
        this.addBreadcrumb(this.breadcrumb);
        this.addActionBtn(this.actionBtn);
    }
    
    destroyed() {
        this.addActionBtn([]);
    }

    currentUser(user) {
        const lastName: string = user['last_name'] !== null ? user['last_name'] : '';
        const firstName: string = user['first_name'] !== null ? user['first_name'] : '';
        const middleName: string = user['middle_name'] !== null ? user['middle_name'] : '';
        return lastName + ' ' + firstName + ' ' + middleName;
    }

    date(value) {
        const options: object = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        const date: string = new Date(value * 1000).toLocaleString('ru-RU', options).replace(',', '');
        return date;
    }

    storageName(val) {
        const obj = {};
        val.forEach( i => obj[i.storage.id] = i.storage.name);
        return Object.keys(obj).map( i => obj[i]);
    }

    paymentsSum(val, key) {
        return val.length ? val.reduce((sum, item) => sum + item[key], 0) : 0;
    }

    loadPage(val) {
        this.loading = true;
        this.getSellList(val);
    }

    onDetail(row) {
        this.$router.push('/sell/view/' + row.id);
    }

    @Watch('shop')
    onLoad() {
        this.$nextTick(() => this.loading = false);
    }


    search: object = {
        'date': [],
        'payment': 'all',
        'status': 'all',
        'client': '',
        'seller': ''
    };

    rangeDate: object = {
        shortcuts: [
            {
                text: 'За вчера',
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
                    picker.$emit('pick', [start, end]);
                }
            }, {
                text: 'За неделю',
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                }
            }, {
                text: 'За месяц',
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit('pick', [start, end]);
                }
            }, {
                text: 'За 3 месяца',
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit('pick', [start, end]);
                }
            }
        ]
    };
}