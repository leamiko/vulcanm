import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

@Component({
    template: require('./index.html')
})
export class ClientUserForm extends Vue {

    @Getter clientSource;
    @Getter clientPersonValid;

    @Prop() item: object;

    validate(obj, key) {
        if (Object.keys(obj).some(v => v === key)) {
            return obj[key][0];
        }
    }

}