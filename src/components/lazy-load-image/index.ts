import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';

@Component({
    template: require('./index.html')
})
export class LazyLoadImage extends Vue {

    @Prop() src: string;

    loading: boolean = false;

    mounted() {
        this.load(this.src);
    }

    load(path) {
        const image = new Image();
        image.src = path;
        image.onload = () => this.loading = true;
        image.onerror = () => this.loading = false;
    }
}
