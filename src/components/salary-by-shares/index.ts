import Vue from 'vue';
import {Component, Watch, Prop} from 'vue-property-decorator';
import {Action, Getter} from 'vuex-class';

import {Numbers} from '../forms/numbers';

@Component({
    template: require('./index.html'),
    components: {
        'numbers': Numbers,
    }
    
})

export class SalaryByShares extends Vue {
    
    @Prop() stuffItem;
    @Prop(String) mode;
    
    @Getter sellPartSalaryTypeList;
    @Getter repairPartSalaryType;
    
}