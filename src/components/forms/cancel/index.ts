import Vue from 'vue';
import { Component, Watch, Prop } from 'vue-property-decorator';
import {Action, Getter} from 'vuex-class';

import { Numbers } from '../numbers';
import { ViewUserName } from '../user-name';

@Component({
    template: require('./cancel.html'),
    components: {
        'numbers': Numbers,
        'user-name': ViewUserName,
    }
})
export class CancelForm extends Vue {

    @Getter btnloader;
    @Getter storages;
    @Getter stuff;
    
    @Action sellUpdatePart;

    @Prop({ 'default': () => {} }) valid: object;
    @Prop() data: object[];
    @Prop({ 'default': () => '' }) title: string;
    @Prop({ 'default': () => 1 }) status: number;
    // @Prop({ 'default': () => '' }) page: string;

    validate(obj, key, index) {
        if (obj !== undefined) {
            if (typeof(obj[index]) !== 'boolean' && obj[index] !== undefined ) {
                return obj[index][key][0];
            }
        }
    }

    page(page) {
        const pageName: string = this.$route.name;
        return pageName === page;
    }

    titleBtn(period) {
        const pageName: string = this.$route.name;
        let title: string = '';
        switch (pageName) {
            case 'transfer-add' : title = ' перемещени'; break;
            case 'cancel-add' : title = ' списани'; break;
            case 'cancel-view' : title = ' списани'; break;
        }
        return title += period === 'past' ? 'я' : 'e';
    }

    checkItemType(val) {
        return val['part_id'] !== undefined ? true : false;
    }

    changeItem(val) {
        this.sellUpdatePart(val);
    }
}