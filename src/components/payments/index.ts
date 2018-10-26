import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

import { Numbers } from '../forms/numbers';
import { ViewDate } from '../forms/date';

@Component({
    template: require('./index.html'),
    components: {
        'numbers': Numbers,
        'date': ViewDate
    }
})
export class Payments extends Vue {

    @Action getPaymentList;
    @Action addBreadcrumb;
    @Action addActionBtn;

    @Getter paymentList;
    @Getter paymentListPageCount;

    loading: boolean = true;
    
    mounted() {
        this.getPaymentList(1);
    }

    loadPage(val) {
        this.loading = true;
        this.getPaymentList(val);
    }

    @Watch('paymentList')
    onLoad() {
        window.scroll(0, 0);
        this.loading = false;
    }

}