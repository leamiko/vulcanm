import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

import { Numbers } from '../../components/forms/numbers';
import { NumberPhone } from '../../components/forms/number-phone';

@Component({
    template: require('./index.html'),
    components: {
        'numbers': Numbers,
        'phone': NumberPhone
    }
})
export class PointPage extends Vue {

    @Getter point;
    @Getter typePoint;
    @Getter pointPageCount;

    @Action getPointList;
    @Action addBreadcrumb;
    @Action addActionBtn;
    @Action deletePoint;

    dialogView: boolean = false;
    dialogDelete: boolean = false;
    pointView: object = {};

    loading: boolean = true;

    beforeMount() {
        this.getPointList(1);
    }

    mounted() {
        this.addBreadcrumb([
            { 'id': 1, 'section': 'Компания', 'link': '/settings' },
            { 'id': 2, 'section': 'Настройки', 'link': '/settings' },
            { 'id': 3, 'section': 'Филиалы', 'link': null }
        ]);
        this.addActionBtn([
            { 'id': 1, 'type': 'add', 'title': 'Новый филиал', 'link': '/settings/point/add', 'icon': 'fa-plus' }
        ]);
    }
    
    destroyed() {
        this.addBreadcrumb([]);
        this.addActionBtn([]);
    }

    loadPage(val) {
        this.getPointList(val);
    }

    viewPoint(val, column) {
        if (column.type !== 'actions') {
            this.pointView = val;
            this.dialogView = !this.dialogView;
        }
    }

    onDialogDelete(item) {
        this.pointView = item;
        this.dialogDelete = !this.dialogDelete;
    }

    @Watch('point')
    onLoad() {
        this.$nextTick(() => this.loading = false );
    }
}