import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import {Action, Getter} from 'vuex-class';

@Component({
    template: require('./index.html')
})
export class StorageAdd extends Vue {

    @Action sendStorage;

    @Getter validStorage;
    @Getter point;
    @Getter btnloader;

    newItem: object = {
        'name': '',
        'point_id': ''
    };

    validate(obj, key) {
        if (Object.keys(obj).some(v => v === key)) {
            return obj[key][0];
        }
    }

    @Watch('validStorage')
    onChange(val: object) {
        if (Object.keys(val).length === 0) {
            this.newItem['name'] = '';
            this.newItem['point_id'] = '';
        }
    }
}