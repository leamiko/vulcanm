import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Getter} from 'vuex-class';

@Component({
    template: require('./works.html'),
})
export class WorksView extends Vue {

    @Prop({
        default : null
    })
    item: object;

}