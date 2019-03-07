const { promisify } = require('util');
const request = require('request');

module.exports = (params) => {
    return new Promise((resolve, reject) => {
        request({json: true, ...params}, function (error, response, body) {
            if (error) {
                reject(error);
            }
            resolve(body);
          });
    });
};