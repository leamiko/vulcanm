import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

import { CashListItem } from '../../components/cash-list-item';

@Component({
    template: require('./index.html'),
    components: {
        'cash-item': CashListItem
    }
})
export class CashListPage extends Vue {

    @Action addBreadcrumb;
    @Action getCashList;
    @Action getPointList;
    
    @Getter cashList;
    @Getter cashListPageCount;
    @Getter point;

    breadcrumb: object[] = [{ 'id': 1, 'section': 'Финансы', 'link': '/cash' }, { 'id': 2, 'section': 'Кассы', 'link': null }];
    loading: boolean = true;

        
    mounted() {
        this.getCashList(1);
        this.getPointList(1);
        this.addBreadcrumb(this.breadcrumb);
    }

    loadPage(val) {
        this.getCashList(val);
    }

    @Watch('cashList')
    onLoad() {
        this.$nextTick( () => this.loading = false );
    }
}