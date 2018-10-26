import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';
import { Fault } from '../__fault';

@Component({
    template: require('./bug.html'),
    components: {
        'fault': Fault
    }
})
export class Bug extends Vue {

    @Getter bug;

    @Action getBugList;
    @Action changeBug;
    @Action sendBug;
    @Action deleteBug;

    newfault = { 'label': null };

    mounted () {
        this.$root.$on('addItemBug', (item) => {
            this.getBugList(item);
            this.newfault = { 'label': null };
        });
        this.$root.$on('editItemBug', (item) => {
            this.changeBug(item);
        });
        this.$root.$on('delItemBug', (item) => {
            this.deleteBug(item);
        });
    }

}