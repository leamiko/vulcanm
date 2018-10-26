import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

@Component({
    template: require('./index.html')
})
export class ManagerFormViewPage extends Vue {

    @Action addBreadcrumb;

    mounted() {
        this.addBreadcrumb([
            { 'id': 1, 'section': 'Компания', 'link': '/settings' },
            { 'id': 2, 'section': 'Настройки', 'link': '/settings' },
            { 'id': 3, 'section': 'Настройка форм', 'link': '/manager-form' },
            { 'id': 4, 'section': 'Форма приема', 'link': null }
        ]);
    }
}