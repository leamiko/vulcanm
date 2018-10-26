import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';

@Component({
    template: require('./index.html')
})
export class PricesPage extends Vue {

    @Getter prices;
    @Getter rounding;
    @Getter orderRounding;

    @Action editPrices;
    @Action addBreadcrumb;

    newItem: object = {};

    mounted() {
        this.newItem = this.prices;
        this.addBreadcrumb([
            { 'id': 1, 'section': 'Компания', 'link': '/settings' },
            { 'id': 2, 'section': 'Настройки', 'link': '/settings' },
            { 'id': 3, 'section': 'Цены', 'link': null }
        ]);
    }

    isEdit(item) {
        this.editPrices(item);
    }
}