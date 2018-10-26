import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

@Component({
    template: require('./index.html')
})
export class CompanyPage extends Vue {

    @Getter company;
    @Getter country;
    @Action addBreadcrumb;

    @Action editCompany;

    newcompany: object = {};

    mounted() {
        this.addBreadcrumb([
            { 'id': 1, 'section': 'Компания', 'link': '/settings' },
            { 'id': 2, 'section': 'Настройки', 'link': '/settings' },
            { 'id': 3, 'section': 'Информация о компании', 'link': null }
        ]);
    }

}