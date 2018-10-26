import Vue from 'vue';
import {Component, Watch} from 'vue-property-decorator';
import {Action, Getter} from 'vuex-class';

import {SalaryTable} from '../../components/salary-table';

@Component({
    template: require('./index.html'),
    components: {
        SalaryTable,
    },
})

export class SalaryPage extends Vue {
    loading: boolean = true;
    
    @Getter stuffWithSalaryBalance;
    
    @Action setStuffWithSalaryBalance;
    @Action getSalaryPeriodTypeList;
    @Action getSellPartSalaryTypeList;
    @Action getRepairPartSalaryType;
    
    async created() {
        await this.setStuffWithSalaryBalance();
        this.getSalaryPeriodTypeList();
        this.getSellPartSalaryTypeList();
        this.getRepairPartSalaryType();
    }
    
    @Watch('stuffWithSalaryBalance')
    onLoad() {
        this.$nextTick(() => this.loading = false);
    }
}