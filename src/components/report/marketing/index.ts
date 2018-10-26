import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { ReportRangeDate } from '../__range-date';
import { Action } from 'vuex-class';
import Pie from '../__chart/Pie';

@Component({
    template: require('./marketing.html'),
    components: {
        'chart-pie': Pie,
        'range-date': ReportRangeDate
    }
})
export class ReportMarketing extends Vue {

    @Action addBreadcrumb;

    labelPie = ['От прибыли', 'От продаж'];
    dataPie = [50, 50];

    mounted() {
        this.addBreadcrumb([
            { 'id': 1, 'section': 'Отчеты', 'link': '/report' },
            { 'id': 2, 'section': 'Маркетинговый отчет', 'link': null }
        ]);
    }
}