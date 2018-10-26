import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import {ReportCash} from '../../components/report/cash';
import {Action} from 'vuex-class';

@Component({
    template: require('./index.html'),
    components: {
        'report': ReportCash,
    }
})
export class ReportCashPage extends Vue {

    @Action addBreadcrumb;

    mounted() {
        this.addBreadcrumb([
            { 'id': 1, 'section': 'Отчеты', 'link': '/report' },
            { 'id': 2, 'section': 'Отчет о кассовых операциях', 'link': '/report/cash' }
        ]);
    }
}