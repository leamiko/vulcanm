import Vue from 'vue';
import Vuex from 'vuex';

import { auth } from './auth';
import { push } from './push';
import { preloader } from './preloader';

import { breadcrumb } from './breadcrumb';
import { parts } from './part';
import { category } from './category';
import { client } from './client';
import { clientSource } from './clientSource';
import { provider } from './provider';
import { form } from './generator-form';
import { bug } from './bug';
import { stuff } from './stuff';
import { company } from './company';
import { point } from './point';
import { storages } from './storage';
import { userStatus } from './user-status';
import { sms } from './sms';
import { smsTemplate } from './sms-template';
import { repair } from './repair';
import { user } from './user';
import { posting } from './posting';
import { cashTypes } from './cash-types';
import { device } from './device';
import { transfer } from './transfer';
import { cancel } from './cancel';
import { work } from './work';
import { shop } from './shop';

import { payments } from './payments';
import { licenses } from './licenses';

import { cash } from './cash';

import {salary} from './salary';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        auth,
        breadcrumb,
        parts,
        category,
        push,
        preloader,
        client,
        clientSource,
        provider,
        form,
        bug,
        stuff,
        company,
        point,
        storages,
        userStatus,
        sms,
        smsTemplate,
        repair,
        user,
        posting,
        cashTypes,
        device,
        transfer,
        cancel,
        work,
        shop,
        payments,
        licenses,
        cash,
        salary,
    }
});