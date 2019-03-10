const request = require('../../../utils/request');

module.exports = () => {
    return request({
        method: 'get',
        uri: `${this.prefix}/get_current_selfmenu_info?access_token=${this.access_token}`
    });
}