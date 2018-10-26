import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Getter} from 'vuex-class';

@Component({
    template: require('./pay.html'),
})
export class PayView extends Vue {

    @Prop({
        default : null
    })
    item: object;

}