const fs = require('fs');
const path = require('path');
const request = require('../utils/request');
const wechatApi = 'https://api.weixin.qq.com/cgi-bin';
const accessTokenPath = path.resolve('./access_token.txt');
const { appId, appSecret } = require('../config');

class wechat {
    constructor(options) {
        this.accessToken;
    }
    getaAccessToken (){
        return new Promise((resolve, reject) => {
            fs.readFile(accessTokenPath, 'utf8', (err, data) => {
                if (err) {
                    if (err.code === 'ENOENT') {
                        this.updateAccessToken().then(data => {
                            resolve(data);
                        })
                        .catch(e => {
                            reject(e)
                        });
                    }
                    reject(err);
                }
                data = JSON.parse(data);
                if (data.expires_in >= new Date().getTime()) {
                    this.updateAccessToken().then(data => {
                        resolve(data);
                    })
                    .catch(e => {
                        reject(e)
                    });
                }
                resolve(data);
              });
        });
    }
    updateAccessToken(){
        return request({
            method: 'get',
            uri: `${wechatApi}/token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`
        }).then(data => {
            data = JSON.parse(data);
            data.expires_in = data.expires_in - 0 + new Date().getTime() - 20;
            fs.writeFileSync(accessTokenPath, data, {
                encoding: 'utf8'});
            return Promise.resolve(data);
        });
    }
    saveAccessToken(){}
}

modules.export = wechat;