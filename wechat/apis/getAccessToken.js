const request = require('../../utils/request');
const { appId, appSecret } = require('../../config');

module.exports = () => {
    return request({
        method: 'get',
        uri: `${wechatApi}/token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`
    }).then(data => {
        data = JSON.parse(data);
        data.expires_in = data.expires_in - 0 + new Date().getTime() - 20;
        return Promise.resolve(data);
    });
}