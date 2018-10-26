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

export class SalaryOperationTable extends Vue {
    
    @Prop(Array) data;
    @Prop(Array) selectedRows;
    @Prop(Number) total;
    @Prop(Boolean) loading;
    
    $refs: any; // for escape of type checking
    
    toggleRowSelection(row, selected) {
        this.$refs['multipleSelectionTable'].toggleRowSelection(row, selected);
    }
    
    clearSelection() {
        this.$refs['multipleSelectionTable'].clearSelection();
    }
    
    summaryMethod({columns, data}) {
        let out = [];
        out[1] = ['Итого:'];
        out[columns.length - 2] = this.total;
        return out;
    }
    
    rowKey(row) {
        return row.id;
    }
    
    handleSelectionChange(rows) {
        this.$emit('update:selectedOperation', rows);
    }
}