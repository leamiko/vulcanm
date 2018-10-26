import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import { Getter, State } from 'vuex-class/lib/bindings';

@Component({
    template: require('./auth.html')
})
export class Auth extends Vue {

    e1: string = 'login';

    userIn = {
      login: '',
      password: '',
      saveUser: false
    };

    @Action signIn;

    @Getter auth;
    @Getter authError;
    

    isAuth(item) {
        this.signIn(item).then(() => {
            this.$router.push('/repair');
        }, () => {
            console.log('Not authorized');
        });
    }

    validate(obj, key, text) {
        if (obj !== undefined && typeof(obj[key]) !== undefined) {
            if (typeof(obj[key]) !== 'boolean' && obj[key] !== undefined ) {
                return text ? obj[key][0] : ' ';
            }
        }
    }
}