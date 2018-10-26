import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Getter } from 'vuex-class';


@Component({
    template: require('./breadcrumb.html'),
})
export class BreadcrumbComponent extends Vue {

    @Getter actionBtn;
    @Getter breadcrumb;
    @Getter auth;
    @Getter user;


    get flagsActionBtn() {
        let path  = this.$route.path.split('/');

        const filterPath = path.filter(el => {
            return el !== '';
        })

        for(let path of filterPath) {
            if(path === 'cash') {
                return false;
            }else {
                return this.actionBtn.length;
            } 
        }
    }

    isAuthorized() {
        return this.user.length !== 0;
    }

    onDialog(type) {
        this.$root.$emit('onDialog', type);
    }

    isLink(link, type) {
        if (link === 'onDialog') {
            this.onDialog(type);
        } else {
            this.$router.push(link);
        }
    }

    type(type) {
        let result = '';
        switch (type) {
            case 'add': result = 'primary'; break;
            case 'edt': result = 'success'; break;
            case 'del': result = 'danger'; break;
        }
        return result;
    }
}