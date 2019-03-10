const request = require('../../../utils/request');

module.exports = body => {
    return request({
        method: 'post',
        uri: `${this.prefix}/material/del_material?access_token=${this.access_token}`,
        body
    });
}