import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

import { StuffForm } from '../../components/stuff-form';

@Component({
    template: require('./index.html'),
    components: {
        'stuff-form': StuffForm
    }
})
export class StuffAddPage extends Vue {

    @Action addBreadcrumb;

    breadcrumb: object[] = [{ 'id': 1, 'section': 'Компания', 'link': '/settings' }, { 'id': 2, 'section': 'Сотрудники', 'link': '/stuff' }, { 'id': 3, 'section': 'Новый сотрудник', 'link': null }];
    item: object = { 
        'point_id': 1, 
        'salary_period': 2,
        'repair_income_salary_type': 0,
        'repair_part_salary_type': 1,
        'sell_part_salary_type': 1,
        'rights': {}
    };

    mounted() {
        this.addBreadcrumb(this.breadcrumb);
    }

}