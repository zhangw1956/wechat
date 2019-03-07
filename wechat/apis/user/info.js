const request = require('../../../utils/request');

module.exports = ({ prefix, access_token, openId}) => {
    return request({
        method: 'get',
        uri: `${prefix}/user/info?${access_token}=ACCESS_TOKEN&openid=${openId}&lang=zh_CN`,
    });
}