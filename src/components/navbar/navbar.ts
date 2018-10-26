import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import { RightSliding } from '../right-sliding';
import { Link } from './link';

import { ViewUserName } from '../../components/forms/user-name';

@Component({
    template: require('./navbar.html'),
    components: {
        'right-sliding': RightSliding,
        'user-name': ViewUserName,
    }
})
export class NavbarComponent extends Vue {
   
    @Getter auth;
    @Getter user;

    isCollapse: boolean = false;

    sliding: boolean = false;
   
    isAuthorized() {
        return this.user.length !== 0;
    }

    isSliding() {
        this.sliding = ! this.sliding;
        document.getElementsByTagName('html')[0].style.overflowY = this.sliding ? 'hidden' : '';
    }

    mounted () {
        this.$root.$on('rightSliding', this.isSliding);
        document.getElementsByTagName('html')[0].style.overflowX = 'hidden';
    }

    repear: Link[] = [
        new Link('Принять в ремонт', '/repair/create'),
        new Link('Принять картриджи', '/refill/create'),
        new Link('hr', ''),
        new Link('Все заказы', '/repair'),
        new Link('Принято', ''),
        new Link('В работе', ''),
        new Link('Ожидает', ''),
        new Link('Готово', ''),
        new Link('Выдано', ''),
        new Link('hr', ''),
        new Link('Перемещения', '/repair/transfers')
    ];

    part: Link[] = [
        new Link('Номенклатура', '/part/nomenklatura'),
        new Link('Остатки товаров', '/part'),
        new Link('Поступления на склад', '/part/posting'),
        new Link('Перемещения между складами', '/storage/transfer'),
        new Link('Списания', '/cancel'),
        new Link('hr', ''),
        new Link('Работы и услуги', '/work'),
    ];

    shop: Link[] = [
        new Link('Новая продажа', '/sell/add'),
        new Link('hr', ''),
        new Link('Все продажи', '/sell'),
    ];

    cache: Link[] = [
        new Link('Кассы и движения средств', '/cash'),
        new Link('Зарплата', '/salary'),
    ];

    report: Link[] = [
        new Link('Текущий отчет', '/report/current'),
        new Link('Финансовый отчет', '/report/economy'),
        new Link('Отчет о работе сотрудников', '/report/stuff'),
        new Link('Отчет о работе филиалов', '/report/point'),
        new Link('Отчет о кассовых операциях', '/report/cash'),
        new Link('Отчет о расходе запчастей', '/report/partuse'),
        new Link('Маркетинговый отчет', '/report/marketing'),
        new Link('Отзывы', '/report/feedback')
    ];

    company: Link[] = [
        new Link('Настройки', '/settings'),
        new Link('Справочники', '/reference/device'),
        new Link('Лицензии', '/service/licenses'),
        new Link('Шаблоны документов', '/service/papers'),
        new Link('SMS', '/service/sms'),
        new Link('Клиенты', '/clients'),
        new Link('Сотрудники', '/stuff'),
        // new Link('Партнёрка', '/partner'),
        // new Link('Виджет', '/integration/widget'),
        // new Link('API', '/apidoc'),
        new Link('Экспорт', '/service/export'),
    ];

    profile: Link[] = [
        new Link('Настройки пользователя', ''),
        new Link('Сменить пароль', ''),
        new Link('Выйти', ''),
    ];
}
