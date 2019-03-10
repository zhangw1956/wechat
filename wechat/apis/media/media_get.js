const request = require('../../../utils/request');

module.exports = () => {
    return request({
        method: 'get',
        uri: `${this.prefix}/media/get?access_token=${this.access_token}&type=${this.type}&media_id=${this.media_id}`,
    });
}