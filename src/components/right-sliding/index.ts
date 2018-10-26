import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

import { ViewUserName } from '../../components/forms/user-name';

@Component({
    template: require('./right-sliding.html'),
    components: {
        'user-name': ViewUserName
    }

})
export class RightSliding extends Vue {

    @Getter point;
    @Getter user;

    @Action signOut;
    @Action getPointList;
    @Action getUserMe;

    @Prop() active: boolean;

    isSliding() {
        this.$root.$emit('rightSliding');
    }

    isAuthOut() {
        this.signOut(false);
        this.$router.push('/auth');
    }

    mounted () {
        this.getPointList(1);
        this.getUserMe();
    }
}