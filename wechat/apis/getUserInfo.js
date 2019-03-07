const request = require('../../utils/request');
const Wechat = require('../wechat');

module.exports = async (openId) => {
    const wechat = new Wechat();
    const access_token = await wechat.getAccessToken();
    return await request({
        method: 'get',
        uri: `https://api.weixin.qq.com/cgi-bin/user/info?${access_token}=ACCESS_TOKEN&openid=${openId}&lang=zh_CN`,
    });
}