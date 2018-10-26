import Vue from 'vue';
import { Action, Getter } from 'vuex-class';
import { Component, Prop, Watch } from 'vue-property-decorator';

import { Numbers } from '../../components/forms/numbers';
import { PostingItem } from '../posting-item';

@Component({
    template: require('./index.html'),
    components: {
        'numbers': Numbers,
        'posting-item': PostingItem,
    }
})
export class ModalCatalog extends Vue {

    @Action getPartList;

    @Getter postingPartsList;

    @Prop({ 'default': () => ''}) type: string;

    dialog: boolean = true;
    parts: object[] = [];


    mounted() {
        this.getPartList({ 'page': 1, 'per-page': 20 });
    }
    
    typePerPage(count) {
        return 'primary';
    }

    changePage(val) {
        // this.content['page'] = val;
        // this.search();
    }
    
    changePerPage(val) {        
        // this.content['per-page'] = val;
        // this.search();
    }

}


