const request = require('../../utils/request');

module.exports = ({ access_token, openId }) => {
    console.log('access_token= ' + access_token);
    return request({
        method: 'get',
        uri: `https://api.weixin.qq.com/cgi-bin/user/info?${access_token}=ACCESS_TOKEN&openid=${openId}&lang=zh_CN`,
    });
}