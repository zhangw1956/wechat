const Router = require('koa-router');
const sha1 = require('sha1');
const ejs = require('ejs');
const config = require('../config');
const reply = require('../wechat/messageTemplate/reply');

const router = new Router();

router.get('/wechat', (ctx, next) => {
    const token = config.token;
    const query = ctx.request.query;
    const timestamp = query.timestamp;
    const nonce = query.nonce;
    const signature = query.signature;
    const echostr = query.echostr;
    const str = [token, timestamp, nonce].sort().join('');
    const sha = sha1(str);
    if (sha === signature) {
        ctx.body = echostr;
    } else {
        ctx.body = 'error';
    }
});

router.post('/wechat', async (ctx, next) => {
    const data = ctx.request.body.xml;
    const MsgType = data.MsgType[0];
    if (MsgType === 'event') {
        const Event = data.Event[0];
        const ToUserName = data.ToUserName[0];
        const FromUserName = data.FromUserName[0];
        if (Event === 'subscribe') {
            const data = await ctx.app.wechat.getUserInfo(FromUserName);
            ctx.body = ejs.render(reply, {
                ToUserName: FromUserName,
                FromUserName: ToUserName,
                CreateTime: new Date(),
                Content: '你好! ' + data.nickname
            });
        }
        if (Event === 'unsubscribe') {
            
        }
    } else {

    }
});

module.exports = router;