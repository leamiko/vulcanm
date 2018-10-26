import Vue from 'vue';
import {Component, Watch} from 'vue-property-decorator';
import {Action, Getter} from 'vuex-class';

import {SalaryOperationTable} from
        '../salary-operatiorn-table';
import {SalaryTransferTable} from
        '../salary-transfer-table';
import {Numbers} from '../../forms/numbers';

@Component({
    template: require('./index.html'),
    components: {
        SalaryOperationTable,
        SalaryTransferTable,
        Numbers,
    },
})

export class SalaryViewPrevious extends Vue {
    
    @Getter salaryTransferListByUserId;
    
    @Action setSalaryTransferListByUserId;
    
    $refs: any; // for escape of type checking
    
    loadingSalaryTransfer = true;
    
    // hooks
    
    created() {
        this.setSalaryTransferListByUserId({
            user_id: this.$route.params.user_id,
        });
    }
    
    // watchers
    
    @Watch('salaryTransferListByUserId')
    onSalaryTransferListByUserIdChange() {
        this.$nextTick(() => this.loadingSalaryTransfer = false);
    }
}

