import Component from 'vue-class-component';
import Vue from 'vue';
import {Action} from 'vuex-class';
import {ExportLog} from '../../components/export-log';
import ExportForm from '../../components/export-form';

@Component({
    template: require('./index.html'),
    components: {
        'log-table': ExportLog,
        'export-form': ExportForm
    }
})
export class Export extends Vue {

    @Action addBreadcrumb;
    
    mounted() {
        this.addBreadcrumb([
            { 'id': 1, 'section': 'Компания', 'link': '/settings' },
            { 'id': 2, 'section': 'Экспорт', 'link': null },
        ]);
    }
    
}