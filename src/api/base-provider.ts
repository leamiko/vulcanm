import axios from 'axios';
import isPlainObject from 'lodash/isPlainObject';

class BaseProvider {
    
    host;
    resource;
    expires;
    refresh;
    access;
    
    defaultCollectable = {pageNum: '1', perPage: '10'};
    
    constructor() {
        this.host = 'http://sysapi-dev1.vulcanm.ru/v1';
    }
    
    async request(method = 'GET', url = '/', data = {}) {
        try {
            
            await this.checkExpiresIn();
            
            const headers: object = {
                'x-access-token': this.access,
                'content-type': 'application/json',
            };
            
            let res = await axios({
                method: method,
                headers: headers,
                url: `${this.host}${url}`,
                data: method === 'POST' ? data : null,
            });
            return res;
            
        } catch (err) {
            throw err;
        }
    }
    
    async checkExpiresIn() {
        this.access = localStorage.getItem('access') ||
            sessionStorage.getItem('access');
        this.expires = localStorage.getItem('expires_in') ||
            sessionStorage.getItem('expires_in');
        this.refresh = localStorage.getItem('refresh') ||
            sessionStorage.getItem('refresh');
        
        const currentTime = Math.round(new Date().getTime() / 1000);
        const expires = Number(this.expires);
        
        if (expires && expires <= currentTime) {
            await this.refreshToken();
        }
    }
    
    async refreshToken() {
        const data: object = {'x-refresh-token': this.refresh};
        try {
            await axios.post(`${this.host}/site/updatetoken`, data)
                .then(res => this.setStorage(res.data));
        } catch (err) {
            this.redirect();
            throw err;
        }
    }
    
    async setStorage(res) {
        const save: boolean = localStorage.getItem('access') !== undefined;
        
        this.access = res.access_token;
        this.refresh = res.refresh_token;
        this.expires = res.expiration_in;
        
        if (save) {
            localStorage.setItem('access', res.access_token);
            localStorage.setItem('refresh', res.refresh_token);
            localStorage.setItem('expires_in', res.expiration_in);
        } else {
            sessionStorage.setItem('access', res.access_token);
            sessionStorage.setItem('refresh', res.refresh_token);
            sessionStorage.setItem('expires_in', res.expiration_in);
        }
    }
    
    redirect() {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        localStorage.removeItem('expires_in');
        sessionStorage.removeItem('access');
        sessionStorage.removeItem('refresh');
        sessionStorage.removeItem('expires_in');
        window.location.replace('/');
    }
    
    buildUrl(param) {
        const key: string = Object.keys(param)[0];
        const elems: string[] = Object.keys(param[key]);
        
        let url: string = '';
        
        elems.forEach((i, item) => {
            let value: string = `${key}[${i}]`;
            url += '&' + encodeURIComponent(value) + '=' +
                encodeURIComponent(param[key][i]);
        });
        return url;
    }
    
    
    superBuildUrl({
        method,
        nestedResources,
        formName,
        form,
        vars,
        collectable,
        expand,
    }) {
        let resourceUrl = this.resource + nestedResources;
        let varsUrl = [];
        let formUrl = [];
        let collectableUrl = [];
        let expandUrl = [];
        
        
        if (vars) {
            varsUrl = this.objectToVariableUrlArray(vars);
        }
        
        
        if (method === 'GET') {
            if (collectable) {
                collectable = Object.assign(
                    {}, this.defaultCollectable, collectable);
                collectableUrl.push(`page=${collectable.pageNum}`);
                collectableUrl.push(`per-page=${collectable.perPage}`);
            }
            if (formName !== undefined) {
                formUrl = this.objectToVariableUrlArray({[formName]: form});
            }
        }
        
        if (expand) {
            expandUrl[0] = `expand=${expand}`;
        }
        
        return (resourceUrl + '?' +
            formUrl.concat(varsUrl, collectableUrl, expandUrl).join('&'));
    }
    
    async superRequest({
        method,
        nestedResources,
        formName,
        form,
        vars,
        collectable,
        expand,
        headers,
    }) {
        const url = this.superBuildUrl({
            method,
            nestedResources,
            formName,
            form,
            vars,
            collectable,
            expand,
        });
        
        try {
            await this.checkExpiresIn();
            
            const defaultHeaders = {
                'x-access-token': this.access,
                'content-type': 'application/json',
            };
            
            let res = await axios({
                method: method,
                headers: Object.assign({}, defaultHeaders, headers),
                url: `${this.host}${url}`,
                data: method === 'POST' && formName !== undefined
                    ? {[formName]: form} : null,
            });
            return res;
        } catch (err) {
            throw err;
        }
        
    }
    
    private objectToVariableUrlArray(obj) {
        let res = [];
        if (isPlainObject(obj)) {
            Object.keys(obj).forEach((varName) => {
                if (typeof obj[varName] === 'object') {
                    let fields = Object.keys(obj[varName]);
                    fields.forEach((fieldName) => {
                        res.push(
                            encodeURIComponent(`${varName}[${fieldName}]`) +
                            '=' +
                            encodeURIComponent(obj[varName][fieldName]));
                    });
                } else {
                    res.push(encodeURIComponent(`${varName}`) + '=' +
                        encodeURIComponent(obj[varName]));
                }
            });
            return res;
        } else {
            throw new Error('Invalid argument, mast be type of Object');
        }
    }
}

export default BaseProvider;
