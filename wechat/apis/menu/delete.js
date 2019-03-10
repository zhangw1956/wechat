const request = require('../../../utils/request');

module.exports = () => {
    return request({
        method: 'get',
        uri: `${this.prefix}/menu/delete?access_token=${this.access_token}`
    });
}