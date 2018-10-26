import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import {Action, Getter} from 'vuex-class';

import { PointForm } from '../../components/point-form';

@Component({
    template: require('./index.html'),
    components: {
        'point-form': PointForm
    }
})
export class PointEditPage extends Vue {

    @Getter viewPoint;

    @Action getViewPoint;
    @Action addBreadcrumb;
    @Action addActionBtn;

    item: object = {};
    color: string = '';

    mounted() {
        this.getViewPoint(this.$route.params.id);
    }

    beforeDestroy() {
        this.addActionBtn();
    }

    @Watch('viewPoint')
    onChange() {
        this.addBreadcrumb([
            { 'id': 1, 'section': 'Компания', 'link': '/settings' },
            { 'id': 2, 'section': 'Настройки', 'link': '/settings' },
            { 'id': 3, 'section': 'Филиалы', 'link': '/settings/point' },
            { 'id': 4, 'section': this.viewPoint['prefix'] + '-' + this.viewPoint['name'], 'link': '/settings/point'},
            { 'id': 5, 'section': 'Изменение', 'link': null }
        ]);
        this.item = this.viewPoint;
        this.color = this.viewPoint['color'];
    }
}