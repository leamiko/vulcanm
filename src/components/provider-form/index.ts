import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';

@Component({
    template: require('./index.html')
})
export class ProviderForm extends Vue {

    @Getter btnloader;
    @Getter validProvider;
    @Getter typePoint;
    @Getter provider;

    @Action sendProvider;
    @Action changeProvider;

    @Prop({ 'default': () => {} }) item: object;
    @Prop() form: string;

    newItem: object = { 'name': '', 'contact_name': '', 'phone': '', 'address': '', 'description': '', 'site': ''};

    validate(obj, key) {
        if (Object.keys(obj).some(v => v === key)) {
            return obj[key][0];
        }
    }

    // @Watch('item')
    // onChange() {
    //     this.newItem = this.item;
    //     console.log('s');
    // }
}