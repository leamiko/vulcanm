import AuthProvider from '../api/providers/auth';
import CancelProvider from '../api/providers/cancel';
import { expect } from 'chai';
import 'mocha';

describe('Cancel', function () {
    before(async () => {
        const result = await AuthProvider.signIn({login: 'telemarket', password: 'telemarket123'});
        sessionStorage.setItem('access', result.data.access_token);
        sessionStorage.setItem('refresh', result.data.refresh_token);
        sessionStorage.setItem('expires_in', result.data.expiration_in);
    });

    it('should return cancel list for GET request', async () => {
        const result = await CancelProvider.getCancelList(1);
        expect(result).to.be.an('object');
        expect(result).to.has.property('data');
        expect(result.data).to.be.an('array');
    });

    it('should create cancel with POST request', async () => {
        const cancel = {
            storage_id: 1,
            penalty_user_id: 1,
            parts: [
                {
                    part_id: 1,
                    price: 1,
                    amount: 1
                }
            ]
        };
        const result = await CancelProvider.sendCancel(cancel);
        expect(result).to.be.an('object');
        expect(result).to.has.property('data');
        expect(result.data).to.be.an('object');
        expect(result.data).to.has.property('id');
        expect(result.data).to.has.property('user_id');
        expect(result.data).to.has.property('penalty_user_id');
        expect(result.data).to.has.property('created_at');
        expect(result.data).to.has.property('total_parts');
        expect(result.data).to.has.property('storage_id');

    });

    it('should not find cancel by invalid ID with GET request', async () => {
        try {
            const result = await CancelProvider.getViewCancel(0);
            expect(result).to.be.an('error');
        } catch (result) {
            expect(result).to.have.property('response');
            expect(result.response).to.have.property('status');
            expect(result.response.status).to.equal(404);
        }
    });

    it('should find cancel by ID with cancel/view GET request', async () => {
        const cancelData = {
            storage_id: 1,
            penalty_user_id: 1,
            parts: [
                {
                    part_id: 1,
                    price: 1,
                    amount: 1
                }
            ]
        };
        const cancel = await CancelProvider.sendCancel(cancelData);
        const savedCancel = await CancelProvider.getViewCancel(cancel.data.id);
        expect(savedCancel).to.be.an('object');
        expect(savedCancel).to.have.property('data');
        expect(savedCancel.data).to.be.an('object');
        expect(savedCancel.data).to.have.property('id');
        expect(savedCancel.data.id).to.be.equal(cancel.data.id);
    });

    it('should revert cancel by ID and do not find it later', async () => {
        const cancelData = {
            storage_id: 1,
            penalty_user_id: 1,
            parts: [
                {
                    part_id: 1,
                    price: 1,
                    amount: 1
                }
            ]
        };
        const cancel = await CancelProvider.sendCancel(cancelData);
        const revertedCancel = await CancelProvider.sendRevert({cancel_id: cancel.data.id});
        expect(revertedCancel).to.be.an('object');
        expect(revertedCancel).to.have.property('data');
        expect(revertedCancel.data).to.be.an('object');
        expect(revertedCancel.data).to.have.property('id');
        expect(revertedCancel.data.id).equal(cancel.data.id);
        try {
            const revertedCancelError = await CancelProvider.getViewCancel(cancel.data.id);
            expect(revertedCancel).to.be.an('error');
        } catch (result) {
            expect(result).to.have.property('response');
            expect(result.response).to.have.property('status');
            expect(result.response.status).to.equal(404);
        }
    });

    it('should revert part cancel with /cancel/revertpart POST request', async () => {
        const cancelData = {
            storage_id: 1,
            penalty_user_id: 1,
            parts: [
                {
                    part_id: 1,
                    price: 1,
                    amount: 1
                },
                {
                    part_id: 2,
                    price: 1,
                    amount: 1
                }
            ]
        };
        const cancel = await CancelProvider.sendCancel(cancelData);
        const savedCancel = await CancelProvider.getViewCancel(cancel.data.id);
        const revertedPart = await CancelProvider.sendRevertPart({cancel_part_id: savedCancel.data.parts[0].id});
        expect(revertedPart).to.be.an('object');
        expect(revertedPart).to.have.property('data');
        expect(revertedPart.data).to.be.an('object');
        expect(revertedPart.data).to.have.property('id');
        expect(revertedPart.data.id).equal(savedCancel.data.parts[0].id);
        expect(revertedPart.data).to.have.property('part_id');
        expect(revertedPart.data.part_id).equal(savedCancel.data.parts[0].part_id);
        const cancelAfterRevertPartView = await  CancelProvider.getViewCancel(cancel.data.id);
        expect(cancelAfterRevertPartView.data.parts).to.not.include(savedCancel.data.parts[0]);
    });
});