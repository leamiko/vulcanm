import Vue from 'vue';
import { Action, Getter } from 'vuex-class';
import { Component, Prop, Watch } from 'vue-property-decorator';

import { Numbers } from '../../components/forms/numbers';

@Component({
    template: require('./index.html'),
    components: {
        'numbers': Numbers
    }
})
export class PostingItem extends Vue {

    @Action sendPostingItem;
    @Action sendPostingPart;
    @Action changePostingPart;
    @Action deletePostingItem;
    @Action deletePostingPartItem;
    @Action deletePostingModalPartItem;
    
    @Getter postingNewItemList;

    @Prop() item: object;
    @Prop({ 'default': () => ''}) type: string;

    checkItem(item) {
        return this.type === 'viewModal' ? this.postingNewItemList.filter(i => i['part_id'] === item.id).length : this.postingNewItemList.filter(i => i['id'] === item.id).length;
    }

    change(item) {
        if ((this.type === 'view' || this.type === 'viewModal') && this.checkItem(item)) {
            item['posting_id'] = Number(this.$route.params.id);
            this.changePostingPart(item);
        }
    }

    sendItem(item) {
        if (this.type === 'view' || this.type === 'viewModal') {
            item['posting_id'] = Number(this.$route.params.id);
            this.sendPostingPart(item);
        } else {
            this.sendPostingItem(item);
        }
    }

    deleteItem(item) {
        if (this.type === 'view') {
            this.deletePostingPartItem(item);
        } else if (this.type === 'viewModal') {
            this.deletePostingModalPartItem(item);
        } else {
            this.deletePostingItem(item);
        }
    }


}