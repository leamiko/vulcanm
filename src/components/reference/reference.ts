import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';

@Component({
    template: require('./reference.html'),
})
export class ReferenceComponent extends Vue {
    
    link: string = '/reference/device';

    mounted() {
        this.link = this.$route.path;
    }

    @Watch('link')
    onChange(val: string) {
        this.$router.push(val);
    }
}