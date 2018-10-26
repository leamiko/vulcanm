import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

import { PointForm } from '../../components/point-form';

@Component({
    template: require('./index.html'),
    components: {
        'point-form': PointForm
    }
})
export class PointAddPage extends Vue {

    @Getter point;
    @Action addBreadcrumb;

    item: object = {};

    color: string = '#1976d2';

    mounted() {
        this.addBreadcrumb([
            { 'id': 1, 'section': 'Компания', 'link': '/settings' },
            { 'id': 2, 'section': 'Настройки', 'link': '/settings' },
            { 'id': 3, 'section': 'Филиалы', 'link': '/settings/point' },
            { 'id': 4, 'section': 'Новый филиал', 'link': null }
        ]);
    }

}