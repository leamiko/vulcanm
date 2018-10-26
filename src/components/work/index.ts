import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import {Action, Getter} from 'vuex-class';

import { Category } from '../__category';
import { Numbers } from '../forms/numbers';

@Component({
    template: require('./work.html'),
    components: {
        'category-tree': Category,
        'numbers': Numbers
    }
})

export class Work extends Vue {

    @Action addBreadcrumb;
    @Action addActionBtn;
    @Action getWorkList;
    @Action getWorkCategory;

    @Getter work;
    @Getter categoryList;

    breadcrumb: object[] = [{ 'id': 1, 'section': 'Склад', 'link': '/part' }, { 'id': 2, 'section': 'Работы и услуги', 'link': null }];
    actionBtn: object[] = [{ 'id': 1, 'type': 'add', 'title': 'Новая работа', 'link': '/work/add', 'icon': 'fa-plus' }];

    open: boolean = false;
    catalogName: string = 'Каталог';
    dialog: boolean = false;

    openCategory() {
        this.open = !this.open;
        this.open ? this.catalogName = '' : this.catalogName = 'Каталог';
    }

    mounted () {
        document.title = 'Работы и услуги';
        this.getWorkList(1);
        this.getWorkCategory();
        this.addBreadcrumb(this.breadcrumb);
        this.addActionBtn(this.actionBtn);
        this.$on('openCategory', this.openCategory);
    }

    destroyed() {
        this.addActionBtn([]);
    }

    // getMoney(val) {
    //     return money('ru-RU', 'RUB', val);
    // }
}