const request = require('../../utils/request');

module.exports = ({prefix, appId, appSecret}) => {
    return request({
        method: 'get',
        uri: `${prefix}/token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`
    }).then(data => {
        return Promise.resolve(data);
    });
}