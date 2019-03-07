const Wechat = require('../wechat/Wechat');

module.exports = () => {
    return async (ctx, next) => {
        new Wechat();
        next();
    }
}