const request = require('../../../utils/request');

module.exports = function (openId) {
    return request({
        method: 'get',
        uri: `${this.prefix}/user/info?access_token=${this.access_token}&openid=${openId}&lang=zh_CN`,
    });
}