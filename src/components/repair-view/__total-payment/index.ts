import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Getter} from 'vuex-class';

@Component({
    template: require('./total-payment.html'),
})
export class TotalPaymentView extends Vue {

    @Prop({
        default : null
    })
    item: object;

}