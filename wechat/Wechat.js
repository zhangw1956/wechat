const fs = require('fs');
const path = require('path');
const request = require('../utils/request');
const accessTokenPath = path.resolve('./access_token.txt');
const { appId, appSecret } = require('../config');
const getAccessTokenApi = require('./apis/getAccessToken');

class wechat {
    constructor(options) {
        this.prefix = 'https://api.weixin.qq.com/cgi-bin';
    }
    accessTokenIsValid() {

    }
    getAccessToken (){
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
        return getAccessTokenApi().then(data => {
            fs.writeFileSync(accessTokenPath, data, { encoding: 'utf8'});
            return Promise.resolve(data);
        })
    }
    saveAccessToken(){}
    getUserInfo() {
        const info = require('./apis/user/info');
        return info(this);
    }
    getUserList() {
        const list = require('./apis/user/list');
        return list(this);
    }
}

modules.export = wechat;