import AuthProvider from '../api/providers/auth';
import PostingProvider from '../api/providers/posting';
import { expect } from 'chai';
import 'mocha';

describe('Posting', function () {
    before(async () => {
        const result = await AuthProvider.signIn({login: 'telemarket', password: 'telemarket123'});
        sessionStorage.setItem('access', result.data.access_token);
        sessionStorage.setItem('refresh', result.data.refresh_token);
        sessionStorage.setItem('expires_in', result.data.expiration_in);
    });

    it('should return posting list for GET request', async () => {
        const result = await PostingProvider.getPostingList(1);
        expect(result).to.be.an('object');
        expect(result).to.have.property('data');
        expect(result.data).to.be.an('array');
    });

    it('should create new posting with POST request', async () => {
        const item = {
            storage_id: 1,
            provider_id: null,
            cash_id: null,
            parts: [
                {
                    part_id: 1,
                    amount: 999,
                    price: 1
                }
            ]
        };
        const result = await PostingProvider.sendPosting(item);
        expect(result).to.be.an('object');
        expect(result).to.has.property('data');
        expect(result.data).to.be.an('object');
        expect(result.data).to.have.property('id');
        expect(result.data).to.have.property('user_id');
        expect(result.data).to.have.property('storage_id');
        expect(result.data.storage_id).equal(item.storage_id);
        expect(result.data).to.has.property('provider_id');
        expect(result.data.provider_id).equal(item.provider_id);
    });

    it('should return recently created posting with GET request', async () => {
        const item = {
            storage_id: 1,
            provider_id: null,
            cash_id: null,
            parts: [
                {
                    part_id: 1,
                    amount: 999,
                    price: 1
                }
            ]
        };
        const result = await PostingProvider.sendPosting(item);
        const posting = await PostingProvider.getPostingView(result.data.id);
        expect(posting).to.be.an('object');
        expect(posting).to.has.property('data');
        expect(posting.data).to.be.an('object');
        expect(posting.data).to.have.property('id');
        expect(posting.data.id).equal(result.data.id);
        expect(posting.data).to.have.property('user_id');
        expect(posting.data.user_id).equal(result.data.user_id);
        expect(posting.data).to.have.property('storage_id');
        expect(posting.data.storage_id).equal(result.data.storage_id);
        expect(posting.data).to.has.property('provider_id');
        expect(posting.data.provider_id).equal(result.data.provider_id);
    });

    it('should not find posting with invalid ID', async () => {
        try {
            const posting = await PostingProvider.getPostingView(0);
            expect(posting).to.be.an('error');
        } catch (result) {
            expect(result).to.be.an('error');
            expect(result).to.have.property('response');
            expect(result.response).to.have.property('status');
            expect(result.response.status).to.equal(404);
        }
    });

    it('should revert posting with POST request and should not find reverted posting', async () => {
        const item = {
            storage_id: 1,
            provider_id: null,
            cash_id: null,
            parts: [
                {
                    part_id: 1,
                    amount: 999,
                    price: 1
                }
            ]
        };
        const posting = await PostingProvider.sendPosting(item);
        const revert = await PostingProvider.revertPosting(posting.data.id);
        expect(posting).to.be.an('object');
        expect(posting).to.has.property('data');
        expect(posting.data).to.be.an('object');
        expect(posting.data).to.have.property('id');
        expect(posting.data.id).equal(revert.data.id);
        try {
            const revertedPosting = await PostingProvider.getPostingView(posting.data.id);
            expect(revertedPosting).to.be.an('error');
        } catch (result) {
            expect(result).to.be.an('error');
            expect(result).to.have.property('response');
            expect(result.response).to.have.property('status');
            expect(result.response.status).to.equal(404);
        }
    });

    it('should add parts to specified posting on /posting/addpart POST request', async () => {
        const item = {
            storage_id: 1,
            provider_id: null,
            cash_id: null,
            parts: [
                {
                    part_id: 1,
                    amount: 999,
                    price: 1
                }
            ]
        };
        const createdPosting = await PostingProvider.sendPosting(item);
        const partToAdd = {
            part_id: 2,
            posting_id: createdPosting.data.id,
            amount: 1000,
            price: 2
        };
        const addedPart = await PostingProvider.sendPostingPart(partToAdd);
        expect(addedPart).to.be.an('object');
        expect(addedPart).to.has.property('data');
        expect(addedPart.data).to.be.an('object');
        expect(addedPart.data).to.have.property('posting_id');
        expect(addedPart.data.posting_id).equal(partToAdd.posting_id);
        expect(addedPart.data).to.have.property('part_id');
        expect(addedPart.data.part_id).equal(partToAdd.part_id);
        expect(addedPart.data).to.have.property('amount');
        expect(addedPart.data.amount).equal(partToAdd.amount);
        expect(addedPart.data).to.have.property('price');
        expect(addedPart.data.price).equal(partToAdd.price);
    });

    it('should update part in posting with call /posting/updatepart POST request', async () => {
        const item = {
            storage_id: 1,
            provider_id: null,
            cash_id: null,
            parts: [
                {
                    part_id: 1,
                    amount: 999,
                    price: 1
                }
            ]
        };
        const createdPosting = await PostingProvider.sendPosting(item);
        const postingView = await PostingProvider.getPostingView(createdPosting.data.id);
        const updatePart = {
            id: postingView.data.parts[0].id,
            part_id: 1,
            amount: 1,
            price: 2
        };
        const updatedPart = await PostingProvider.changePostingPart(updatePart);
        expect(updatedPart).to.be.an('object');
        expect(updatedPart).to.has.property('data');
        expect(updatedPart.data).to.be.an('object');
        expect(updatedPart.data).to.have.property('id');
        expect(updatedPart.data.id).equal(updatePart.id);
        expect(updatedPart.data).to.have.property('part_id');
        expect(updatedPart.data.part_id).equal(updatePart.part_id);
        expect(updatedPart.data).to.have.property('amount');
        expect(updatedPart.data.amount).equal(updatePart.amount);
        expect(updatedPart.data).to.have.property('price');
        expect(updatedPart.data.price).equal(updatePart.price);
    });

    it('should revert part in posting with posting/revertpart POST request', async () => {
        const item = {
            storage_id: 1,
            provider_id: null,
            cash_id: null,
            parts: [
                {
                    part_id: 1,
                    amount: 1,
                    price: 1
                },
                {
                    part_id: 2,
                    amount: 1,
                    price: 1
                }
            ]
        };
        const createdPosting = await PostingProvider.sendPosting(item);
        const postingView = await PostingProvider.getPostingView(createdPosting.data.id);
        const revertPart = await PostingProvider.revertPostingPart(postingView.data.parts[0].id);
        expect(revertPart).to.be.an('object');
        expect(revertPart).to.has.property('data');
        expect(revertPart.data).to.be.an('object');
        expect(revertPart.data).to.have.property('id');
        expect(revertPart.data.id).equal(postingView.data.parts[0].id);
        const postingAfterRevertPartView = await PostingProvider.getPostingView(createdPosting.data.id);
        expect(postingAfterRevertPartView.data.parts).to.not.include(postingView.data.parts[0]);
    });

});