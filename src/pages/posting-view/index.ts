import Vue from 'vue';
import { Action, Getter } from 'vuex-class';
import { Component, Prop, Watch } from 'vue-property-decorator';

import { ViewDate } from '../../components/forms/date';
import { ViewUserName } from '../../components/forms/user-name';
import { Numbers } from '../../components/forms/numbers';
import { PostingItem } from '../../components/posting-item';
import { ModalCatalog } from '../../components/modal-catalog';

@Component({
    template: require('./index.html'),
    components: {
        'date': ViewDate,
        'user-name': ViewUserName,
        'numbers': Numbers,
        'posting-item': PostingItem,
        'modal-catalog': ModalCatalog
    }
})
export class PostingViewPage extends Vue {

    @Action getPostingView;

    @Getter postingView;
    @Getter btnloader;

    mounted() {
        this.getPostingView(this.$route.params.id);
    }

}


