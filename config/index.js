const path = require('path');
const fs = require('fs');
const { promisify } = require('util');

const config = {
    appId: 'wxd96c094247b2eb47',
    appSecret: 'edf0c71c71f73aba3d1376e7c75f951a',
    token: 'zhangwei',
    accessTokenPath: path.resolve('./access_token.txt'),
    getAccessToken: function () {
        const read = promisify(fs.readFile);
        return read(config.accessTokenPath, 'utf8');
    },
    saveAccessToken: function (data) {
        const write = promisify(fs.writeFile);
        write(config.accessTokenPath, JSON.stringify(data)).catch(e => {
            throw e;
        });
    }
};

module.exports = config;