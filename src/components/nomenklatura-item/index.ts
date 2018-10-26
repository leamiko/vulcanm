import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

import { LazyLoadImage } from '../../components/lazy-load-image';
import { Numbers } from '../../components/forms/numbers';

import { directive as onClickOutside } from 'vue-on-click-outside'; 

Vue.directive('on-click-outside', onClickOutside);

let openPartPopover: boolean = false;

@Component({
    template: require('./index.html'),
    components: {
        'numbers': Numbers,
        'lazy-load-image': LazyLoadImage
    }
})

export class NomenklaturaItem extends Vue {

    @Prop() item: object;
    @Prop() index: number;

    @Action sendCopyPart;
    @Action changePart;

    @Getter headNomenkl;
    @Getter vatlist;
    @Getter rewardTypeList;
    @Getter btnloader;

    dialog: boolean = false;
    popName: boolean = false;
    popRepairPrice: boolean = false;
    popSellPrice: boolean = false;
    popRepairReward: boolean = false;
    popSellReward: boolean = false;
    popArt: boolean = false;
    popVat: boolean = false;
    load: boolean = false;
    newItem: object = {};
    type: string = '';


    copy() {
        const item = { 'part_id': this.item['id'] };
        this.sendCopyPart(item).then( res => {
            this.dialog = false;
        });
    }

    open(type, val) {
        openPartPopover = val;
        switch (type) {
            case 'name': this.popName = val; break;
            case 'price_repair': this.popRepairPrice = val; break;
            case 'price_sell': this.popSellPrice = val; break;
            case 'reward_repair': this.popRepairReward = val; break;
            case 'reward_sell': this.popSellReward = val; break;
            case 'art': this.popArt = val; break;
            case 'vat': this.popVat = val; break;
        }
    }

    clickCell(type) {
        if (!openPartPopover && this.type === '') {
            this.type = type;
            this.newItem = JSON.parse(JSON.stringify(this.item));
            this.open(type, true);
        }
    }

    close() {
        this.open(this.type, false);
        this.type = '';
    }

    save() {
        if (this.type !== '') {
            this.load = true;
            this.changePart(this.newItem).then( res => {
                this.close();
                this.load = false;
            });
        }
    }
}