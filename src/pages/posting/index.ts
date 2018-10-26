import Vue from 'vue';
import { Action, Getter } from 'vuex-class';
import { Component, Prop, Watch } from 'vue-property-decorator';

import { Numbers } from '../../components/forms/numbers';
import { ViewUserName } from '../../components/forms/user-name';

@Component({
    template: require('./index.html'),
    components: {
        'numbers': Numbers,
        'user-name': ViewUserName
    }
})
export class PostingPage extends Vue {

    @Action addActionBtn;
    @Action getPostingList;
    @Action addBreadcrumb;

    @Getter posting;
    @Getter postingPageCount;

    loading: boolean = true;
    breadcrumb: object[] = [{ 'id': 1, 'section': 'Склад', 'link': '/part' }, { 'id': 2, 'section': 'Поступления на склад', 'link': null }];
    actionBtn: object[] = [{ 'id': 1, 'type': 'add', 'title': 'Новое поступление', 'link': '/part/posting/add', 'icon': 'fa-plus' }];

    created () {
        this.getPostingList(1);
        document.title = 'Поступления на склад';
    }

    mounted() {
        this.addBreadcrumb(this.breadcrumb);
        this.addActionBtn(this.actionBtn);
    }

    destroyed () {
        this.addActionBtn([]);
    }

    loadPage(val) {
        this.loading = true;
        this.getPostingList(val);
    }

    date(value) {
        const options: object = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        const date: string = new Date(value * 1000).toLocaleString('ru-RU', options).replace(',', '');
        return date;
    }

    onDetail(row) {
        this.$router.push('/part/posting/view/' + row.id);
    }



    @Watch('posting')
    onGet() {
        this.$nextTick(() => this.loading = false);
    }
}


