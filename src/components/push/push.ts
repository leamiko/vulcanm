import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

import { Push } from '../../store/push/types';

@Component({
    template: require('./push.html'),
})
export class PushComponent extends Vue {

    @Getter error: Push[];
    @Getter success: Push[];
    @Getter warning: Push[];
    @Getter info: Push[];

    @Watch('error')
    onChangeError(val: object) {
        this.$notify.error({
            title: val['title'],
            message: val['item'],
            position: 'bottom-right'
        });
    }

    @Watch('success')
    onChangeSuccess(val: object) {
        this.$notify.success({
            title: val['title'],
            message: val['item'],
            position: 'bottom-right'
        });
    }

    @Watch('warning')
    onChangeWarning(val: object) {
        this.$notify.warning({
            title: val['title'],
            message: val['item'],
            position: 'bottom-right'
        });
    }

    @Watch('info')
    onChangeInfo(val: object) {
        this.$notify.info({
            title: val['title'],
            message: val['item'],
            position: 'bottom-right'
        });
    }

}