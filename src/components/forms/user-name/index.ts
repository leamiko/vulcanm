import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

@Component({
    template: require('./index.html'),
    props: ['value']
})

export class ViewUserName extends Vue {

    user(user) {
        if (user !== undefined) {
            const lastName: string = user['last_name'] !== null ? user['last_name'] : '';
            const firstName: string = user['first_name'] !== null ? user['first_name'] : '';
            const middleName: string = user['middle_name'] !== null ? user['middle_name'] : '';
            return lastName + ' ' + firstName + ' ' + middleName;
        }
    }
}