import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({
    template: require('./fault.html')
})
export class Fault extends Vue {

    @Prop() fault: object[];
    @Prop() newfault: object;

    dialogEdit = false;
    dialogDelete = false;

    itemFault: object = { 'label': null };


    get isDisable() {
        return this.newfault['label'] <= '';
    }

    isItem(item) {
        this.itemFault = item;
    }

    isAdd(item) {
        this.$root.$emit('addItemBug', item);
    }

    isEdit(item) {
        this.$root.$emit('editItemBug', item);
    }

    isDelete(item) {
        this.$root.$emit('delItemBug', item);
    }
}