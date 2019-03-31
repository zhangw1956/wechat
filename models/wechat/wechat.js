const Sequelize = require('sequelize');
const sequelize = require('../../db/sequelize/sequelize')('wechat');
class Wechat {
    constructor() {
        this.wechat = sequelize.define('access_token', {
            value: {
                type: Sequelize.CHAR
            },
            expires_in: {
                type: Sequelize.INTEGER
            }
        });
    }
    async getAccessToken () {
        const data =  await this.wechat.findAll({
            attributes: ['value', 'expire'],
        });
        return data[0].dataValues;
    }
}

module.exports = new Wechat;