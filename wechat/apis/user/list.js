const request = require('../../../utils/request');

module.exports = () => {
    return request({
        method: 'get',
        uri: `${this.prefix}/user/get?access_token=${this.access_token}&next_openid=''`,
    });
}