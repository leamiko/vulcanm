import Vue from 'vue';
import VueRouter from 'vue-router';

// Components

import { Error404Component } from './../components/404';

// Авторизация

import { Auth } from './../components/auth';

// Раздел "Склад"
import { NomenklaturaPage } from './../pages/nomenklatura';
import { PartPage } from './../pages/part';
import { PartEditPage} from './../pages/part-edit';
import { PartAddPage } from './../pages/part-add';

import { PostingPage } from './../pages/posting';
import { PostingAddPage } from './../pages/posting-add';
import { PostingViewPage } from './../pages/posting-view';

import { TransferPage } from './../pages/transfer';
import { TransferAddPage } from './../pages/transfer-add';
import { Cancel } from './../components/cancel';
import { CancelAdd } from './../components/cancel-add';
import { CancelView } from './../components/cancel-view';
import { Work } from './../components/work';
import { Sell } from './../components/sell';
import { SellAddPage } from './../pages/sell-add';

// Раздел "Ремонт"
import { Repair } from './../components/repair';
import { RepairView } from './../components/repair-view';
import { RepairTransfers } from './../components/repair-transfers';

import { StuffPage } from './../pages/stuff';
import { StuffAddPage } from './../pages/stuff-add';
import { StuffEditPage } from './../pages/stuff-edit';

import { Bug } from './../components/bug';

// Финансы
import {SalaryPage} from './../pages/salary';
import {SalaryViewPage} from './../pages/salary-view';
import {SalaryTransferViewPage} from './../pages/salary-transfer-view';

// Раздел "Отчеты"
import { Report } from './../components/report';
import { ReportCurrent } from './../components/report/current';
import { ReportEconomy } from './../components/report/economy';
import { ReportStuff } from './../components/report/stuff';
import { ReportPoint } from './../components/report/point';
import { ReportCashPage } from './../pages/report-cash/index';
import { ReportPartuse } from './../components/report/partuse';
import { ReportMarketing } from './../components/report/marketing';
import { Feedback } from './../components/feedback';

// Раздел "компания"
import { SmsPages } from './../pages/sms';
import { BuySms } from './../components/sms-buy';
import { LicensesPage } from './../pages/licenses';
import { PapersPage } from './../pages/papers';

// Раздел "компания - настройки"
import { Setting } from './../components/setting';
import { CompanyPage } from './../pages/company';
import { PointPage } from './../pages/point';
import { PointEditPage } from './../pages/point-edit';
import { PointAddPage } from './../pages/point-add';
import { StoragePage } from './../pages/storage';
import { RepairsPage } from './../pages/repairs';
import { UserStatusPage } from './../pages/user-status';
import { PricesPage } from './../pages/prices';
import { SmsTemplatesPage } from './../pages/sms-templates';
import { ManageFormPage } from './../pages/manageform';
import { ManagerFormViewPage } from './../pages/manager-form-view';

import { AboutComponent } from './../components/about';

// Раздел "компания - справочники"
import { ReferenceComponent } from './../components/reference';

import { ClientsPage } from './../pages/clients';
import { ClientsViewPage } from './../pages/clients-view';
import { ClientsEditPage } from './../pages/clients-edit';
import { ClientsAddPage } from './../pages/clients-add';

import { DevicePage } from './../pages/device';
import { ProviderPage } from '../pages/provider';
import { ProviderEditPage } from '../pages/provider-edit';
import { ProviderAddPage } from '../pages/provider-add';
import { CashTypesPage } from './../pages/cash-types';
import { ClientSourcePage } from './../pages/client-source';

import { CashListPage } from './../pages/cash';
import { CashViewPage } from './../pages/cash-view';
import {Export} from '../pages/export';

Vue.use(VueRouter);

const routers = new VueRouter({
    base: __dirname,
    routes: [
        { path: '*', component: Error404Component },
        { path: '/', component: AboutComponent, redirect: '/repair' },
        { path: '/auth', component: Auth,
            beforeEnter: (to, from, next) => {
                if ( ( sessionStorage.getItem('access') || localStorage.getItem('access') ) !== null ) {
                    next('/');
                } else {
                    next();
                }
            }
        },

        { path: '/repair', name: 'repair', component: Repair },
        { path: '/repair/view/:id', name: 'repair-view', component: RepairView },
        { path: '/repair/create', name: 'repair-create', component: RepairView },
        { path: '/repair/transfers', name: 'repair-transfers', component: RepairTransfers },

        { path: '/refill/create', name: 'refill-create', component: RepairView },

        { path: '/bug', name: 'bug', component: Bug },

        { path: '/part', name: 'part', component: PartPage},
        { path: '/part/edit/:id', name: 'part-edit', component: PartEditPage },
        { path: '/part/add', name: 'part-add', component: PartAddPage },
        { path: '/part/nomenklatura',  name: 'nomenklatura', component: NomenklaturaPage },
        { path: '/part/posting',  name: 'posting', component: PostingPage },
        { path: '/part/posting/add',  name: 'posting-add', component: PostingAddPage },
        { path: '/part/posting/view/:id',  name: 'view-posting', component: PostingViewPage },

        { path: '/storage/transfer',  name: 'transfer', component: TransferPage },
        { path: '/storage/transfer/add',  name: 'transfer-add', component: TransferAddPage },

        { path: '/clients', name: 'clients', component: ClientsPage },
        { path: '/clients/view/:id', name: 'clients-view', component: ClientsViewPage },
        { path: '/clients/add', name: 'clients-add', component: ClientsAddPage },
        { path: '/clients/edit/:id', name: 'clients-edit', component: ClientsEditPage },

        { path: '/work', name: 'work', component: Work },

        { path: '/cancel', name: 'cancel', component: Cancel },
        { path: '/cancel/add', name: 'cancel-add', component: CancelAdd },
        { path: '/cancel/view/:id', name: 'cancel-view', component: CancelView },

        { path: '/sell', name: 'sell', component: Sell },
        { path: '/sell/add', name: 'sell-add', component: SellAddPage },
        { path: '/sell/view/:id', name: 'sell-view', component: SellAddPage },

        { path: '/reference', name: 'reference', component: ReferenceComponent, redirect: '/reference/device', children: [
            { path: 'device', name: 'device', component: DevicePage },
            { path: 'provider', name: 'provider', component: ProviderPage },
            { path: 'cash-types', name: 'cash-types', component: CashTypesPage },
            { path: 'sources', name: 'sources', component: ClientSourcePage }]
        },
        { path: '/reference/provider/edit/:id', name: 'provider-edit', component: ProviderEditPage},
        { path: '/reference/provider/add', name: 'provider-add', component: ProviderAddPage},
        { path: '/settings', name: 'settings', component: Setting, redirect: '/settings/info', children: [
            { path: 'info', name: 'set-info', component: CompanyPage },
            { path: 'point', name: 'point', component: PointPage },
            { path: 'storage', name: 'set-storage', component: StoragePage },
            { path: 'repairs', name: 'set-repairs', component: RepairsPage },
            { path: 'user-status', name: 'set-user-status', component: UserStatusPage },
            { path: 'prices', name: 'set-prices', component: PricesPage },
            { path: 'sms-templates', name: 'set-sms', component: SmsTemplatesPage },
            { path: 'manageform', name: 'set-manageform', component: ManageFormPage }]
        },

        { path: '/settings/manageform/view/:id', name: 'manager-form-view', component: ManagerFormViewPage },
        { path: '/settings/point/edit/:id', name: 'point-edit', component: PointEditPage },
        { path: '/settings/point/add', name: 'point-add', component: PointAddPage },

        { path: '/service/sms', component: SmsPages, name: 'sms' },
        { path: '/service/buysms', component: BuySms, name: 'buy-sms' },

        { path: '/service/papers', component: PapersPage, name: 'papers' },

        { path: '/service/licenses', component: LicensesPage, name: 'licenses' },
        {
            path: '/service',
            name: 'service',
            component: ReferenceComponent,
            children: [
                { path: 'settings', component: DevicePage, name: 'service-settings' },
            ]
        },
        { path: '/service/export', component: Export, name: 'export' },
        {
            path: '/report',
            name: 'report',
            component: Report,
            redirect: '/report/current',
            children: [{
                path: 'current',
                component: ReportCurrent,
                name: 'report-current'
            }, {
                path: 'economy',
                component: ReportEconomy,
                name: 'report-economy'
            }, {
                path: 'stuff',
                component: ReportStuff,
                name: 'repost-stuff'
            }, {
                path: 'point',
                component: ReportPoint,
                name: 'report-point'
            }, {
                path: 'cash',
                component: ReportCashPage,
                name: 'report-cash'
            }, {
                path: 'partuse',
                component: ReportPartuse,
                name: 'report-partuse'
            }, {
                path: 'marketing',
                component: ReportMarketing,
                name: 'report-marketing'
            }, {
                path: 'feedback',
                component: Feedback,
                name: 'report-feedback'
            }]
        },
        {
            path: '/salary',
            name: 'salary',
            component: SalaryPage
        },
        {
            path: '/salary/transfer/:employee_id/:transfer_id',
            name: 'salary-transfer-view',
            component: SalaryTransferViewPage,
        },
        {
            path: '/salary/:tab/:user_id',
            name: 'salary-view',
            component: SalaryViewPage
        },
        {path: '/cash', name: 'cash-list', component: CashListPage},
        {path: '/cash/view/:id', name: 'cash-view', component: CashViewPage},
        {path: '/stuff', name: 'stuff', component: StuffPage},
        {path: '/stuff/add', name: 'stuff-add', component: StuffAddPage},
        {path: '/stuff/edit/:id', name: 'stuff-edit', component: StuffEditPage},
        {
            path: '/partner',
            name: 'partner',
            component: ClientsPage
        }, {
            path: '/apidoc',
            name: 'apidoc',
            component: ClientsPage
        }, {
            path: '/integration/widget',
            name: 'widget',
            component: ClientsPage
        },
    ]
});

routers.beforeEach((to, from, next) => {
    if (to.path !== '/auth') {
        if ( ( sessionStorage.getItem('access') || localStorage.getItem('access') ) === null ) {
            next('/auth');
        } else {
            next();
        }
    } else {
        next();
    }
});

export default routers;