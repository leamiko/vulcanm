import Vue from 'vue';
import {Component, Watch, Prop} from 'vue-property-decorator';
import {Action, Getter} from 'vuex-class';

import {SalaryAmountAndPeriodType} from '../salary-amount-and-period-type';
import {SalaryByShares} from '../salary-by-shares';
import {Numbers} from '../forms/numbers';

@Component({
    template: require('./index.html'),
    components: {
        SalaryAmountAndPeriodType,
        SalaryByShares,
        Numbers,
    },
})

export class SalaryTable extends Vue {
    
    @Prop(Array) data;
    @Prop(Boolean) loading;
    
    onView(row) {
        this.$router.push(`/salary/current/${row.id}`);
    }
    
    summaryMethod({columns, data}) {
        let out = [];
        out[0] = 'Итого:';
        out[columns.length - 1] = data.reduce(
            (prev, curr) => prev += curr.salaryBalance, 0);
        return out;
    }
}
