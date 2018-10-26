import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import Line  from '../__chart/Line';
import Pie  from '../__chart/Pie';

@Component({
    template: require('./report-current.html'),
    components: {
        'chart-line': Line,
        'chart-pie': Pie
    }
})
export class ReportCurrent extends Vue {

    @Action addBreadcrumb;

    label = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль'];
    data = [40, 3900, 10, 400, 39, 80, 1000];

    labelPie = ['От прибыли', 'От продаж'];
    dataPie = [50, 50];

    mounted() {
        this.addBreadcrumb([
            { 'id': 1, 'section': 'Отчеты', 'link': '/report' },
            { 'id': 2, 'section': 'Текущий отчёт', 'link': null }
        ]);
    }
}