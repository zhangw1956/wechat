const request = require('../../../utils/request');

module.exports = (body) => {
    return request({
        method: 'post',
        uri: `${this.prefix}/menu/create?access_token=${this.access_token}`,
        body
    });
}