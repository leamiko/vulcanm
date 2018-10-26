import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { Getter, Mutation, Action } from 'vuex-class';
import { PartLogTable } from '../part-log-table';

@Component({
    name: 'log',
    template: require('./index.html'),
    components: {
        'part-log-table': PartLogTable,
    }
})

export class PartLog extends Vue {

    @Getter storages;
    @Action getStorageList;

    activeStorage: number;

    mounted() {
        this.getStorageList(1);
    }
}