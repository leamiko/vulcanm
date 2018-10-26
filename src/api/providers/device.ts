import BaseProvider from '../base-provider';

class DeviceProvider extends BaseProvider {
    constructor() {
        super();
    }

    async getDeviceTypeList() {
        let res = await this.request('GET', `/device/typelist`);
        return res;
    }

    async getDeviceVendorList(id) {
        let res = await this.request('GET', `/device/vendorlist?typeId=${id}`);
        return res;
    }

    async getDeviceList(id) {
        let res = await this.request('GET', `/device/devicelist?vendorId=${id}`);
        return res;
    }

    async sendDeviceType(item) {
        const data: object = { 'DeviceType': item };
        let res = await this.request('POST', `/device/adddevicetype`, data);
        return res;
    }

    async sendDeviceVendor(item) {
        const data: object = { 'DeviceVendor': item };
        let res = await this.request('POST', `/device/adddevicevendor`, data);
        return res;
    }

    async sendDeviceModel(item) {
        const data: object = { 'Device': item };
        let res = await this.request('POST', `/device/adddevice`, data);
        return res;
    }

    async changeDeviceType(item) {
        const data: object = { 'DeviceType': item };
        let res = await this.request('POST', `/device/updatedevicetype?id=${item.id}`, data);
        return res;
    }

    async changeDeviceVendor(item) {
        const data: object = { 'DeviceVendor': item };
        let res = await this.request('POST', `/device/updatedevicevendor?id=${item.id}`, data);
        return res;
    }

    async changeDeviceModel(item) {
        const data: object = { 'Device': item };
        let res = await this.request('POST', `/device/updatedevice?id=${item.id}`, data);
        return res;
    }

    async deleteDeviceType(item) {
        const data: object = { 'DeviceTypeDeleteForm': item };
        let res = await this.request('POST', `/device/deletedevicetype`, data);
        return res;
    }

    async deleteDeviceVendor(item) {
        const data: object = { 'DeviceVendorDeleteForm': item };
        let res = await this.request('POST', `/device/deletedevicevendor`, data);
        return res;
    }

    async deleteDeviceModel(id) {
        const data: object = { 'DeviceDeleteForm': { 'id': id } };
        let res = await this.request('POST', `/device/deletedevice`, data);
        return res;
    }
}

export default new DeviceProvider();