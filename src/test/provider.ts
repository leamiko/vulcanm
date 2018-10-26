import 'mocha';
import { expect } from 'chai';
import AuthProvider from '../api/providers/auth';
import ProviderProvider from '../api/providers/provider';

describe('Provider api tests', () => {
    before(async () => {
        const result = await AuthProvider.signIn({login: 'telemarket', password: 'telemarket123'});
        sessionStorage.setItem('access', result.data.access_token);
        sessionStorage.setItem('refresh', result.data.refresh_token);
        sessionStorage.setItem('expires_in', result.data.expiration_in);
    });

    it('should return providers list for /provider/index GET call', async () => {
        const result = await ProviderProvider.getProviderList(1);
        expect(result).to.be.an('object');
        expect(result).to.has.property('data');
        expect(result.data).to.be.an('array');
    });

    it('should create provider with /provider/add POST call', async () => {
        const providerData = {
            name: 'demo api provider'
        };
        const result = await ProviderProvider.sendProvider(providerData);
        expect(result).to.be.an('object');
        expect(result).to.have.property('data');
        expect(result.data).to.be.an('object');
        expect(result.data).to.have.property('id');
        expect(result.data).to.have.property('name');
        expect(result.data.name).equal(providerData.name);
        const savedProvider = await ProviderProvider.getViewProvider(result.data.id);
        expect(savedProvider).to.be.an('object');
        expect(savedProvider).to.have.property('data');
        expect(savedProvider.data).to.have.property('name');
        expect(savedProvider.data.name).equal(providerData.name);
    });

    it('should return 404 error when invalid ID was passed to /provider/view GET request', async () => {
        try {
            const result = await ProviderProvider.getViewProvider(0);
            expect(result).to.be.an('error');
        } catch (result) {
            expect(result).to.have.property('response');
            expect(result.response).to.have.property('status');
            expect(result.response.status).to.equal(404);
        }
    });

    it('should update provider with /provider/update POST request', async () => {
        const providerData = {
            name: 'demo api provider'
        };
        const addedProvider = await ProviderProvider.sendProvider(providerData);
        const updateProviderData = {
            name: 'updated name'
        };
        const updatedProvider = await ProviderProvider.changeProvider(addedProvider.data.id, updateProviderData);
        expect(updatedProvider).to.be.an('object');
        expect(updatedProvider).to.have.property('data');
        expect(updatedProvider.data).to.be.an('object');
        expect(updatedProvider.data).to.have.property('id');
        expect(updatedProvider.data).to.have.property('name');
        expect(updatedProvider.data.name).equal(updateProviderData.name);
        const savedProvider = await ProviderProvider.getViewProvider(addedProvider.data.id);
        expect(savedProvider).to.be.an('object');
        expect(savedProvider).to.have.property('data');
        expect(savedProvider.data).to.have.property('name');
        expect(savedProvider.data.name).equal(updateProviderData.name);
    });

    it('should delete provider with /provider/delete POST call', async () => {
        const providerData = {
            name: 'demo api provider'
        };
        const addedProvider = await ProviderProvider.sendProvider(providerData);
        const deletedProvider = await ProviderProvider.deleteProvider(addedProvider.data.id);
        expect(deletedProvider).to.be.an('object');
        expect(deletedProvider).to.have.property('data');
        expect(deletedProvider.data).to.be.an('object');
        expect(deletedProvider.data).to.have.property('id');
        expect(deletedProvider.data.id).equal(addedProvider.data.id);
        try {
            const requestProviderAfterDelete = await ProviderProvider.getViewProvider(addedProvider.data.id);
            expect(requestProviderAfterDelete).to.be.an('error');
        } catch (result) {
            expect(result).to.have.property('response');
            expect(result.response).to.have.property('status');
            expect(result.response.status).to.equal(404);
        }
    });

});