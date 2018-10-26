import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import {Action, Getter} from 'vuex-class';

@Component({
    template: require('./iphone.html'),
})
export class Iphone extends Vue {

    @Prop() msg: object[];
    @Prop() sender: string;

}