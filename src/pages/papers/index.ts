import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { Action } from 'vuex-class';

@Component({
    template: require('./index.html')
})
export class PapersPage extends Vue {

    @Action addBreadcrumb;

    mounted() {
        this.addBreadcrumb([
            { 'id': 1, 'section': 'Компания', 'link': '/settings' },
            { 'id': 2, 'section': 'Шаблоны документов', 'link': null }
        ]);
    }
}