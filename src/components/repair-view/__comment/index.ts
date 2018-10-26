import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Getter} from 'vuex-class';

@Component({
    template: require('./comment.html'),
})
export class CommentView extends Vue {

    @Prop({
        default : null
    })
    item: object;

}