import Vue from 'vue';
import {Component, Watch, Prop} from 'vue-property-decorator';
import {Action, Getter} from 'vuex-class';

import {SalaryAmountAndPeriodType} from '../salary-amount-and-period-type';
import {SalaryByShares} from '../salary-by-shares';
import {Numbers} from '../forms/numbers';
import {ViewDate} from '../forms/date';

@Component({
    template: require('./index.html'),
    components: {
        SalaryAmountAndPeriodType,
        SalaryByShares,
        Numbers,
        ViewDate,
    },
})

export class SalaryTransferViewTable extends Vue {
    
    @Prop(Array) data;
    @Prop(Boolean) loading;
    
    
    
    summaryMethod({columns, data}) {
        let out = [];
        out[0] = ['Итого:'];
        out[columns.length - 1] = this.data.reduce((prev, curr) => {
            return prev += curr.sum;
        }, 0);
        return out;
    }
}