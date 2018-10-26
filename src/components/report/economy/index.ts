import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import Pie from '../__chart/Pie';
import { ReportRangeDate } from '../__range-date';

@Component({
    template: require('./economy.html'),
    components: {
        'chart-pie': Pie,
        'range-date': ReportRangeDate
    }
})
export class ReportEconomy extends Vue {

    @Action addBreadcrumb;

    labelPie = ['Использование з/ч в ремонте', 'Ремонтные работы', 'Продажи'];
    dataPie = [6.59, 82.60, 10.81];
    labelPie1 = ['Использование з/ч в ремонте', 'Ремонтные работы', 'Продажи'];
    dataPie1 = [31.57, 50.66, 17.77];
    labelPie2 = ['Использование з/ч в ремонте', 'Продажи'];
    dataPie2 = [71.19, 28.81];

    mounted() {
        this.addBreadcrumb([
            { 'id': 1, 'section': 'Отчеты', 'link': '/report' },
            { 'id': 2, 'section': 'Финансовый отчёт', 'link': null }
        ]);
    }
}