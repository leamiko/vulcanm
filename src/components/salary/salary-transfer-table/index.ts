import Vue from 'vue';

import {Component, Watch, Prop} from 'vue-property-decorator';
import {Action, Getter} from 'vuex-class';

import {ViewDate} from '../../forms/date/index';

@Component({
    template: require('./index.html'),
    components: {
        ViewDate,
    },
})

export class SalaryTransferTable extends Vue {
    
    @Prop(Array) data;
    @Prop(Boolean) loading;
    
    $refs: any; // for escape of type checking
    
    onView(row) {
        this.$router.push(`/salary/transfer/${row.user_id}/${row.id}`);
    }
}