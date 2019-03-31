const reply = require('./reply/reply');
class wechat {
    constructor(options) {
        this.prefix = 'https://api.weixin.qq.com/cgi-bin';
        this.appId = options.appId;
        this.appSecret = options.appSecret;
        this.access_token = options.access_token;
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