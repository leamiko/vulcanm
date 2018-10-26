import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import { ReportRangeDate } from '../__range-date';

@Component({
    template: require('./partuse.html'),
    components: {
        'range-date': ReportRangeDate
    }
})
export class ReportPartuse extends Vue {

    @Action addBreadcrumb;

    mounted() {
        this.addBreadcrumb([
            { 'id': 1, 'section': 'Отчеты', 'link': '/report' },
            { 'id': 2, 'section': 'Отчет о расходе запчастей', 'link': null }
        ]);
    }
}