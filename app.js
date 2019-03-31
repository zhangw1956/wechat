const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const xmlBody = require('koa-xml-body');
const logger = require('koa-logger');
const router = require('./routes');
const Wechat = require('./wechat/Wechat');
const { appId, appSecret } = require('./config');
const models = require('./models/models');
const app = new Koa();

app.use(async (ctx, next) =>{
	try{
		await next();
	}catch(e){
		ctx.app.emit(e);
	}
});

app.use(logger());
app.use(xmlBody());
app.use(bodyParser());
app.use(async(ctx, next) => {
    ctx.models = models;
    await next();
});
app.use(async (ctx, next) => {
    const access_token = ctx.services.wechat.getAccessToken();
    app.context.wechat = new Wechat({
        appId: appId,
        appSecret: appSecret,
        access_token: access_token
    });
    await next();
});
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
    console.log('start port 3000');
});

app.on('error', (err, ctx) =>{
	console.error(err);
})