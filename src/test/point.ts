import 'mocha';
import { expect } from 'chai';
import AuthProvider from '../api/providers/auth';
import PointProvider from '../api/providers/point';

describe('Point api tests', () => {
    before(async () => {
        const result = await AuthProvider.signIn({login: 'telemarket', password: 'telemarket123'});
        sessionStorage.setItem('access', result.data.access_token);
        sessionStorage.setItem('refresh', result.data.refresh_token);
        sessionStorage.setItem('expires_in', result.data.expiration_in);
        // удаляем филиалы в случае совпадения префикса с тестовыми
        const points = await PointProvider.getPointList(1);
        for (let i = 0; i < points.data.length; i++) {
            if (points.data[i].prefix === 'ts1' || points.data[i].prefix === 'ts2' || points.data[i].prefix === 'ts3') {
                await PointProvider.deletePoint(points.data[i].id);
            }
        }
    });

    it('should return point list for /point/index GET call', async () => {
        const result = await PointProvider.getPointList(1);
        expect(result).to.be.an('object');
        expect(result).to.has.property('data');
        expect(result.data).to.be.an('array');
    });

    it('should create point with /point/add POST call', async () => {
        const pointData = {
            prefix: 'ts1',
            name: 'demo api point',
            type: 1,
            color: '#000000'
        };
        const result = await PointProvider.sendPoint(pointData);
        expect(result).to.be.an('object');
        expect(result).to.have.property('data');
        expect(result.data).to.be.an('object');
        expect(result.data).to.have.property('id');
        expect(result.data).to.have.property('name');
        expect(result.data.name).equal(pointData.name);
        const savedPoint = await PointProvider.getViewPoint(result.data.id);
        expect(savedPoint).to.be.an('object');
        expect(savedPoint).to.have.property('data');
        expect(savedPoint.data).to.have.property('name');
        expect(savedPoint.data.name).equal(pointData.name);
    });

    it('should return 404 error when invalid ID was passed to /point/view GET request', async () => {
        try {
            const result = await PointProvider.getViewPoint(0);
            expect(result).to.be.an('error');
        } catch (result) {
            expect(result).to.have.property('response');
            expect(result.response).to.have.property('status');
            expect(result.response.status).to.equal(404);
        }
    });

    it('should update point with /point/update POST request', async () => {
        const pointData = {
            prefix: 'ts2',
            name: 'demo api point',
            type: 1,
            color: '#000000'
        };
        const addedPoint = await PointProvider.sendPoint(pointData);
        const updatePointData = {
            name: 'updated name',
            prefix: 'ts2',
            type: 1,
            color: '#000000'
        };
        const updatedPoint = await PointProvider.changePoint(addedPoint.data.id, updatePointData);
        expect(updatedPoint).to.be.an('object');
        expect(updatedPoint).to.have.property('data');
        expect(updatedPoint.data).to.be.an('object');
        expect(updatedPoint.data).to.have.property('id');
        expect(updatedPoint.data).to.have.property('name');
        expect(updatedPoint.data.name).equal(updatePointData.name);
        const savedPoint = await PointProvider.getViewPoint(addedPoint.data.id);
        expect(savedPoint).to.be.an('object');
        expect(savedPoint).to.have.property('data');
        expect(savedPoint.data).to.have.property('name');
        expect(savedPoint.data.name).equal(updatePointData.name);
    });

    it('should delete point with /point/delete POST call', async () => {
        const pointData = {
            prefix: 'ts3',
            name: 'demo api point',
            type: 1,
            color: '#000000'
        };
        const addedPoint = await PointProvider.sendPoint(pointData);
        const deletedPoint = await PointProvider.deletePoint(addedPoint.data.id);
        expect(deletedPoint).to.be.an('object');
        expect(deletedPoint).to.have.property('data');
        expect(deletedPoint.data).to.be.an('object');
        expect(deletedPoint.data).to.have.property('id');
        expect(deletedPoint.data.id).equal(addedPoint.data.id);
        try {
            const requestPointAfterDelete = await PointProvider.getViewPoint(addedPoint.data.id);
            expect(requestPointAfterDelete).to.be.an('error');
        } catch (result) {
            expect(result).to.have.property('response');
            expect(result.response).to.have.property('status');
            expect(result.response.status).to.equal(404);
        }
    });

});