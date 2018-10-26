import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Getter} from 'vuex-class';

@Component({
    template: require('./actions.html'),
})
export class ActionsView extends Vue {

    @Prop({
        default : null
    })
    item: object;



}