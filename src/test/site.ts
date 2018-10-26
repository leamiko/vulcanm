import AuthProvider  from '../api/providers/auth';
import SiteProvider from '../api/providers/site';
import { expect } from 'chai';
import 'mocha';

describe('Echo', function () {
    it('Should response to echo request', async () => {
        const result = await SiteProvider.index();
        expect(result).to.be.an('object');
        expect(result).to.have.property('status');
        expect(result.status).to.equal(200);
        expect(result).to.have.property('data');
        expect(result.data).to.be.an('string');
        expect(result.data).to.be.equal('I am alive');
    });
});

describe('Authorization',  () => {
    it('Should authorize with valid credentials', async () => {
        const result = await AuthProvider.signIn({login: 'telemarket', password: 'telemarket123'});
        expect(result).to.be.an('object');
        expect(result).to.have.property('status');
        expect(result.status).to.equal(200);
        expect(result).to.have.property('data');
        expect(result.data).to.be.an('object');
        expect(result.data).to.have.property('access_token');
    });
    it('Should return 422 on invalid credentials', async () => {
        try {
            const result = await AuthProvider.signIn({login: 'telemarket', password: 'invalid_pass'});
            expect(result).to.be.an('error');
        } catch (result) {
            expect(result).to.be.an('error');
            expect(result).to.have.property('response');
            expect(result.response).to.have.property('status');
            expect(result.response.status).to.equal(422);
            expect(result.response).to.have.property('data');
            expect(result.response.data).to.be.an('object');
            expect(result.response.data).to.have.property('login');
        }

    });
});