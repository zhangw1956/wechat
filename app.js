const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const xmlBody = require('koa-xml-body');
const koaBunyanLogger = require('koa-bunyan-logger');
const router = require('./routes');
const app = new koa();

app.use(koaBunyanLogger());
//app.use(koaBunyanLogger.requestIdContext());
//app.use(koaBunyanLogger.requestLogger());

app.use(xmlBody());
app.use(bodyParser()); 

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
    console.log('start port 3000');
});