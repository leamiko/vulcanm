import Vue from 'vue';
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/ru-RU';
import routers from './router';
import { store } from './store';
import { mapActions } from 'vuex';
import VueTippy from 'vue-tippy';
import { directive as onClickOutside } from 'vue-on-click-outside' ;

// ** Components **

import { NavbarComponent } from './components/navbar';
import { BreadcrumbComponent } from './components/breadcrumb';
import { FooterComponent } from './components/footer';
import { PushComponent } from './components/push';


// ** Styles **

import './style/main.scss';
import {Auth} from './components/auth';


Vue.use(ElementUI, { locale });
Vue.use(VueTippy, {
    arrow : true,  
    animation : 'scale',
    size : 'small' 
});
Vue.directive('on-click-outside', onClickOutside);

new Vue({
    el: '#app',
    store,
    router: routers,
    components: {
        'navbar': NavbarComponent,
        'breadcrumb': BreadcrumbComponent,
        'footbar': FooterComponent,
        'push': PushComponent,
        'auth': Auth
    },
    data: {
        upVisible: false
    },
    computed: {
        unauthorized: () => store.getters.auth === false,
    },
    methods: {
        upTop() {
            let s = document.body.scrollTop || window.pageYOffset;
            let t = setInterval( () => s > 0 ? window.scroll(0, s -= 45) : clearInterval(t) );
        }
    },
    mounted() {
        document.addEventListener('scroll', () => {
            this.upVisible = document.body.scrollTop > 200 || window.pageYOffset > 200;
        });
    }
});
