import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import {State, Getter, Mutation, Action} from 'vuex-class';

// import { Part } from '../../store/part/types';


@Component({
    template: require('./about.html')
})
export class AboutComponent extends Vue {

    // @Getter parts: Part[];
    // @Getter dones: Part[];

    // @Action addPart;
    // @Action togglePart;

    // newPart: Part = {
    //     text: '',
    //     checked: false
    // };
}



