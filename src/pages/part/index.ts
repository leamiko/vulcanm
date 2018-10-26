import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

import { Category } from '../../components/__category';
import { LazyLoadImage } from '../../components/lazy-load-image';
import { PartNav } from '../../components/part-nav';
import { Numbers } from '../../components/forms/numbers';

import { PartItem } from '../../components/part-item';

import virtualList from 'vue-virtual-scroll-list';

@Component({
    template: require('./index.html'),
    components: {
        'category-tree': Category,
        'part-nav': PartNav,
        'lazy-load-image': LazyLoadImage,
        'numbers': Numbers,
        'part-item': PartItem,
        'virtual-list': virtualList
    }
})

export class PartPage extends Vue {

    @Action getPartList;
    @Action getPartPage;
    @Action getAvailableList;
    @Action addBreadcrumb;
    @Action addActionBtn;

    @Getter categoryList;
    @Getter parts;
    @Getter headsPart;
    @Getter partPageCount;
    @Getter partPageCurrent;
    
    breadcrumb: object[] = [{ 'id': 1, 'section': 'Склад', 'link': '/part' }, { 'id': 2, 'section': 'Остатки товаров', 'link': null }];
    actionBtn: object[] = [{ 'id': 1, 'type': 'add', 'title': 'Новое поступление', 'link': '/part/addposting', 'icon': 'fa-plus' }];
    content: object = {
        'page': 1,
        'name': '',
        'barcode': '',
        'art': '',
        'category': 1,
        'include_internal': 1,
        'amount_control': 0,
        'per-page': 20
    };
    scrollActive: boolean = false;
    loadingPart: boolean = true;
    loadingPage: boolean = false;
    
    mounted () {
        document.title = 'Остатки товаров';
        this.getPartList(this.content);
        this.getAvailableList();
        this.scroll();
        this.addBreadcrumb(this.breadcrumb);
        this.addActionBtn(this.actionBtn);
    }

    destroyed() {
        this.addActionBtn([]);
        this.content['page'] =  1;
    }

    columnActive(props) {
        return props.some(i => i.active);
    }

    scroll() {
        const table = document.querySelector('.part__tbody');
        table.addEventListener('scroll', i => {
            if (table.scrollTop + table.clientHeight >= table.scrollHeight - 300 && this.scrollActive) {
                this.content['page']++;
                this.scrollActive = false;
                this.loadingPage = true;
                this.getPartPage(this.content);
            }
        });
    }

    @Watch('parts')
    onChangeVal() {
        this.loadingPage = false;
        if (this.partPageCount !== this.partPageCurrent) {
            this.scrollActive = true;           
        }
        this.$nextTick(() => this.loadingPart = false ); 
    }
}