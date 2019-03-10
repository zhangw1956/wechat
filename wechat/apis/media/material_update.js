const request = require('../../../utils/request');

module.exports = body => {
    return request({
        method: 'post',
        uri: `${this.prefix}/material/update_news?access_token=${this.access_token}`,
        body
    });
}