const request = require('../../../utils/request');

module.exports = () => {
    return request({
        method: 'get',
        uri: `${this.prefix}/material/batchget_material?access_token=${this.access_token}`,
    });
}