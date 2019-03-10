const request = require('../../../utils/request');

module.exports = body => {
    return request({
        method: 'post',
        uri: `${this.prefix}/media/upload?access_token=${this.access_token}&type=${this.type}`,
        body
    });
}