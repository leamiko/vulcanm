import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';


@Component({
    template: require('./index.html'),
})

export class PartFilter extends Vue {

    @Action getPartList;

    include_internal: boolean = true;
    

    @Prop({ 'default': () => {} }) filter: object;

    onFilter() {
        this.getPartList(this.filter);
    }

    onClearFilter() {
        this.filter['name'] = '';
        this.filter['barcode'] = '';
        this.filter['art'] = '';
        this.filter['include_internal'] = 1;
        this.onFilter();
    }

    @Watch('include_internal')
    onChange(val: boolean) {
        this.filter['include_internal'] = val ? 1 : 0;
    }

}