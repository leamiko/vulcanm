import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Getter} from 'vuex-class';

@Component({
    template: require('./logs.html'),
})
export class LogsView extends Vue {

    @Prop({
        default : null
    })
    item: object;

}