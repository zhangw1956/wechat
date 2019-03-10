const request = require('../../../utils/request');

module.exports = () => {
    return request({
        method: 'get',
        uri: `${this.prefix}/material/get_materialcount?access_token=${this.access_token}`,
    });
}