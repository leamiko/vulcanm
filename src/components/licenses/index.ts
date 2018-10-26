import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

import { ViewDate } from '../forms/date';

@Component({
    template: require('./index.html'),
    components: {
        'date': ViewDate
    }
})
export class Licenses extends Vue {

    @Action getLicenseList;
    @Action addBreadcrumb;
    @Action addActionBtn;

    @Getter licensesList;
    @Getter licensesListPageCount;

    loading: boolean = true;

    mounted() {
        this.getLicenseList(1);
    }

    loadPage(val) {
        this.loading = true;
        this.getLicenseList(val);
    }

    countDay(end) {
        const value: number = end - Math.round(new Date().getTime() / 1000);
        const day: number = Math.ceil(value / 86400);
        return day;
    }

    @Watch('licensesList')
    onLoad() {
        window.scroll(0, 0);
        this.loading = false;
    }

}