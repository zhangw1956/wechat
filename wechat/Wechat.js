const getAccessTokenApi = require('./apis/getAccessToken');

class wechat {
    constructor(options) {
        this.prefix = 'https://api.weixin.qq.com/cgi-bin';
        this.appId = options.appId;
        this.appSecret = options.appSecret;
        this.access_token = '';
        this.getAccessToken = options.getAccessToken;
        this.saveAccessToken = options.saveAccessToken;
        this.getAccessToken().then(data => {
            try {
                data = JSON.parse(data);
            } catch(e) {
                throw e;
            }
            if (this.accessTokenIsValid(data)) {
                this.access_token = data.access_token;
            } else {
                this.updateAccessToken();
            }
        }).catch(e => {
            if (e.code === 'ENOENT') {
                this.updateAccessToken();
                return;
            }
            throw e;
        });
    }
    accessTokenIsValid(data) {
        const now = new Date().getTime();
        if (!data || !data.access_token || !data.expires_in || data.expires_in <= now ) {
            return false;
        }
        return true;
    }
    updateAccessToken(){
        getAccessTokenApi(this).then(data => {
            try {
                data = JSON.parse(data);
                const now = new Date().getTime();
                data.expires_in = now + (data.expires_in - 20) * 1000;
            } catch (e) {
                throw e;
            }
            this.access_token = data.access_token;
            this.saveAccessToken(data);
        })
    }
    getUserInfo(openId) {
        const info = require('./apis/user/info');
        return info({ openId, ...this});
    }
    getUserList() {
        const list = require('./apis/user/list');
        return list(this);
    }
}

module.exports = wechat;