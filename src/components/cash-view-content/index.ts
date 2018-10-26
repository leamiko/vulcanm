import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

import { ViewUserName } from '../forms/user-name';
import { ViewDate } from '../forms/date';
import { Numbers } from '../forms/numbers';

@Component({
    template: require('./index.html'),
    components: {
        'user-name': ViewUserName,
        'date': ViewDate,
        'numbers': Numbers
    }
})
export class CashViewContent extends Vue {

    @Getter cashOperationPageCount;

    @Prop({ 'default': () => [] }) data: object[];
    
}