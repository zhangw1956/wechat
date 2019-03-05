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

router.post('/wechat', (ctx, next) => {
    const data = ctx.request.body.xml;
    const MsgType = data.MsgType;
});

module.exports = router;