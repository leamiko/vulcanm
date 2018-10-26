import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

import { PartSettingTable } from '../part-setting-table';
import { PartFilter } from '../part-filter';

@Component({
    template: require('./index.html'),
    components: {
        'part-setting-table': PartSettingTable,
        'part-filter': PartFilter
    }
})

export class PartNav extends Vue {

    @Action getPartList;

    @Getter partAmountControl;
    @Getter parts;

    @Prop() filter: object;

    loadingAmount: boolean = true;
    amountControlActive: boolean = false;
   
    get isPage() {
        return this.$route.name === 'part';
    }

   get amountControlType() {
        return this.amountControlActive ? 'danger' : 'warning';
    }

    onAmount() {
        this.amountControlActive = !this.amountControlActive;
        this.filter['amount_control'] = this.amountControlActive ? 1 : 0;
        this.filter['page'] = 1;
        this.getPartList(this.filter);
    }

    @Watch('parts')
    onloadParts(val: object) {
        this.loadingAmount = false;  
    }

    @Watch('amountControlActive')
    onChangeAmount(val: boolean) {
        this.$root.$emit('amountControl', val);
    }       
}