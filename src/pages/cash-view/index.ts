import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

import { CashViewFilter } from '../../components/cash-view-filter';
import { CashViewContent } from '../../components/cash-view-content';
import { Numbers } from '../../components/forms/numbers';

@Component({
    template: require('./index.html'),
    components: {
        'cash-filter': CashViewFilter,
        'cash-content': CashViewContent,
        'numbers': Numbers        
    }
})
export class CashViewPage extends Vue {

    @Action getCashOperation;
    @Action addBreadcrumb;
    @Action clearCashOperation;

    @Getter cashViewDetail;
    @Getter cashView;
    @Getter cashOperationCountIn;
    @Getter cashOperationCountOut;
    @Getter cashOperationTotalIn;
    @Getter cashOperationTotalOut;

    breadcrumb: object[] = [{ 'id': 1, 'section': 'Финансы', 'link': '/cash' }, { 'id': 2, 'section': 'Кассы', 'link': '/cash' }, { 'id': 3, 'section': 'Касса', 'link': null }];
    id: number = null;
    loading: boolean = true;
    dialog: boolean = false;
    typeBtn: number = null;
    label: string = '';
    filterForm: object = {
        'cashbox_id': '',
        'created_at_start': '',
        'created_at_end': '',
        'sum_min': '',
        'sum_max': '',
        'act_type_id': '',
        'custom_act_type_id': '',
        'created_by': ''
    };
    form: object = {};

    created() {
        if(this.cashViewDetail !== '') {
            this.breadcrumb[this.breadcrumb.length - 1]['section'] = this.cashViewDetail;
        }
    }

    mounted() {
        this.filterForm['cashbox_id'] = this.id = Number(this.$route.params.id);
        this.addBreadcrumb(this.breadcrumb);
        this.getCashOperation(this.filterForm);
    }

    get total() {
        return Number(this.cashOperationTotalIn) + Number(this.cashOperationTotalOut);
    }

    onDialog(label, type) {
        this.typeBtn = type;
        this.label = label;
        this.dialog = true;
        
    }

    @Watch('cashView')
    onLoad() {
        this.$nextTick(() => this.loading = false );
    }

    beforeDestroy() {
        this.clearCashOperation();
    }
}
