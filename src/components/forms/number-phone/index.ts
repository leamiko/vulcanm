import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({
    template: require('./index.html'),
    props: ['value']
})

export class NumberPhone extends Vue {

}