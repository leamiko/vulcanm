import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';

@Component({
    template: require('./index.html')
})
export class RepairsPage extends Vue {

    @Getter repairsSetting;

    @Action addBreadcrumb;

    newSetting: object = {};

    mounted() {
        this.newSetting = this.repairsSetting;

        this.addBreadcrumb([
            { 'id': 1, 'section': 'Компания', 'link': '/settings' },
            { 'id': 2, 'section': 'Настройки', 'link': '/settings' },
            { 'id': 3, 'section': 'Заказы', 'link': null }
        ]);
    }
}