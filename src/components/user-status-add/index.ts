import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';

@Component({
    template: require('./index.html')
})
export class UserStatusAdd extends Vue {

    @Action sendUserStatus;

    @Getter userStatus;
    @Getter repairStatus;
    @Getter validStatus;
    @Getter btnloader;

    newItem: object = {
        'parent_id': null,
        'name': null,
    };

    validate(obj, key) {
        if (Object.keys(obj).some(v => v === key)) {
            return obj[key][0];
        }
    }

    @Watch('validStatus')
    onChanged(val: object) { 
        if (Object.keys(val).length === 0) {
            this.newItem['name'] = '';
            this.newItem['parent_id'] = '';
        }
    }  
}