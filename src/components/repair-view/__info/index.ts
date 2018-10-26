import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Getter} from 'vuex-class';

@Component({
    template: require('./info.html'),
})
export class InfoView extends Vue {

    @Prop({
        default : null
    })
    item: object;

}