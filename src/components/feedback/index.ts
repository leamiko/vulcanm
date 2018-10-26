import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { Action } from 'vuex-class';

@Component({
    template: require('./feedback.html'),
})
export class Feedback extends Vue {

    @Action addBreadcrumb;

    msg = 'Отзывы';

    label = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль'];
    data = [40, 3900, 10, 400, 39, 80, 1000];

    labelPie = ['От прибыли', 'От продаж'];
    dataPie = [50, 50];

    mounted() {
        this.addBreadcrumb([
            { 'id': 1, 'section': 'Отчеты', 'link': '/report' },
            { 'id': 2, 'section': 'Отзывы', 'link': null }
        ]);
    }
}