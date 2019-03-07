const request = require('../../../utils/request');

module.exports = ({ prefix, access_token }) => {
    return request({
        method: 'get',
        uri: `${prefix}/user/get?access_token=${access_token}&next_openid=''`,
    });
}