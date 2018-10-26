import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import Vddl from 'vddl';
import draggable from 'vuedraggable';
import { Getter, Mutation, Action } from 'vuex-class';

import { Categories } from '../../../store/category/types';

Vue.use(Vddl);

@Component({
    name: 'category-tree',
    template: require('./child.html'),
    components: {
        'draggable': draggable
    }
})

export class Child extends Vue {

    @Prop() item: object;
    // @Prop() active: boolean;
    // @Prop() child: boolean;
    // @Prop() disable: boolean;
    @Prop() paddingItem: number;
    // @Prop() dialogEdit: boolean;
    // @Prop() dialogDelete: boolean;
    @Prop() itemActive: number;

    get isPaddingItem() {
        let padding = this.paddingItem + 20;
        return padding;
    }

    toggle: boolean = false;
    active: boolean = false;

    // toggleChild() {
    //     this.item['expanded'] = !this.item['expanded'];
    // }

    isItemActive(key) {
        this.$root.$emit('categoryItemActive', key);
    }

    isDialogAdd(item) {
        this.$root.$emit('dialogAddCategory', item);
    }

    isDialogEdit(item) {
        this.$root.$emit('dialogEditCategory', item);
    }
    
    isDialogDelete(item) {
        this.$root.$emit('dialogDeleteCategory', item);
    }

    isMoved(event) {
        console.log('Элемент с id: ' + event.item.dataset.id);
    }

    isMoves(event) {
        let elem = Number(event.to.parentElement.dataset.id);

        console.log('Новый родитель с id: ' + elem);
    }

}