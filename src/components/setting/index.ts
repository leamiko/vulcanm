import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

@Component({
    template: require('./setting.html')
})
export class Setting extends Vue {

    link: string = '/settings/info';

    mounted() {
        this.link = this.$route.path;
    }

    @Watch('link')
    onChange(val: string) {
        this.$router.push(val);
    }

}