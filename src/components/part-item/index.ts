import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

import { LazyLoadImage } from '../../components/lazy-load-image';
import { Numbers } from '../../components/forms/numbers';

@Component({
    template: require('./index.html'),
    components: {
        'numbers': Numbers,
        'lazy-load-image': LazyLoadImage
    }
})

export class PartItem extends Vue {

    @Prop() item: object;
    @Prop() index: number;

    @Action sendCopyPart;

    @Getter headsPart;
    @Getter btnloader;

    dialog: boolean = false;

    activeBtnDelete(prop) {
        return prop.every(i => i.amount === 0);
    }

    copy() {
        const item = { 'part_id': this.item['id'] };
        this.sendCopyPart(item).then( res => {
            this.dialog = false;
        });
    }
}