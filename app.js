const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const xmlBody = require('koa-xml-body');
const logger = require('koa-logger');
const router = require('./routes');
const Wechat = require('./wechat/Wechat');
const { appId, appSecret, getAccessToken, saveAccessToken } = require('./config');

const app = new Koa();

app.wechat = new Wechat({
    appId: appId,
    appSecret: appSecret,
    getAccessToken: getAccessToken,
    saveAccessToken: saveAccessToken
});

app.use(logger());
app.use(xmlBody());
app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
    console.log('start port 3000');
});