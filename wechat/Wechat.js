const getAccessTokenApi = require('./apis/getAccessToken');
const reply = require('./reply/reply');
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
                this.accessTokenUpdate();
            }
        }).catch(e => {
            if (e.code === 'ENOENT') {
                this.accessTokenUpdate();
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
    accessTokenUpdate(){
        getAccessTokenApi(this).then(data => {
            const now = new Date().getTime();
            data.expires_in = now + (data.expires_in - 20) * 1000;
            this.access_token = data.access_token;
            this.saveAccessToken(data);
        })
    }
    replyBody({MsgType, options}) {
        if (typeof reply[MsgType] !== 'function') {
            throw new Error(`call createReplyTemplate error, Msgtype:${MsgType} is not surport`);
        }
        return reply[MsgType](options); 
    }
    commentOpen() {}
    ommentClose() {}
    commentList() {}
    commentMarkelect() {}
    commentUnmarkelect() {}
    commentDelete() {}
    commentReplyAdd() {}
    commentReplyDelete() {}
    tagsCreate() {}
    tagsGet() {}
    tagsUpdate() {}
    tagsMembersGetblacklist() {}
    tagsMembersBatchblacklist() {}
    userInfo(openId) {
        const info = require('./apis/user/info');
        console.log(this);
        return info.call(this, openId);
    }
    userList() {
        const list = require('./apis/user/list');
        return list.call(this);
    }
    userInfoUpdateremark() {}
}

module.exports = wechat;