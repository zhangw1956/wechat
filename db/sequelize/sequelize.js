const Sequelize = require('sequelize');
const { server } = require('../../config');

module.exports = database => {
    const sequelize = new Sequelize(database, server.username, server.password, {
        host: server.host,
        dialect: 'mysql',
        logging: true,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    });
    
    sequelize
        .authenticate()
        .then(() => {
        console.log('mysql 链接成功');
        })
        .catch(err => {
        console.error('mysql 链接失败:', err);
        });
    return sequelize;
};