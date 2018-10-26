import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import { ReportRangeDate } from '../__range-date';
import Bar from '../__chart/Bar';
import Pie from '../__chart/Pie';

@Component({
    template: require('./point.html'),
    components: {
        'chart-pie': Pie,
        'chart-bar': Bar,
        'range-date': ReportRangeDate
    }
})
export class ReportPoint extends Vue {

    @Action addBreadcrumb;

    labelPie = ['FIX', 'CMP'];
    dataPie = [94.26, 5.74];

    mounted() {
        this.addBreadcrumb([
            { 'id': 1, 'section': 'Отчеты', 'link': '/report' },
            { 'id': 2, 'section': 'Отчёт о работе филиалов', 'link': null }
        ]);
    }
}