const Router = require('koa-router');
const sha1 = require('sha1');
const config = require('../config');

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
    console.log(data);
    const ToUserName = data.ToUserName[0];
    const FromUserName = data.FromUserName[0];
    const MsgType = data.MsgType[0];
    if (MsgType === 'event') {
        const Event = data.Event[0];
        if (Event === 'subscribe') {
            const userInfo = await ctx.app.wechat.userInfo(FromUserName);
            console.error(userInfo);
            ctx.body = ctx.app.wechat.replyBody({
                MsgType: 'text',
                options: {
                    ToUserName: FromUserName,
                    FromUserName: ToUserName,
                    Content: '你好！ ' + userInfo.nickname
                }
            });
        }
        if (Event === 'unsubscribe') {
            
        }
    } else if (MsgType === 'text') {
        ctx.body = ctx.app.wechat.createReplyTemplate({
            MsgType: 'text',
            options: {
                ToUserName: FromUserName,
                FromUserName: ToUserName,
                Content: '您输入的是 ' + data.Content
            }
        });
    } else {

    }
});

module.exports = router;