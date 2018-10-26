import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Getter} from 'vuex-class';

@Component({
    template: require('./order.html'),
})
export class OrderView extends Vue {

    @Prop({
        default : ''
    })
    item: object;

}