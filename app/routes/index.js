/**
 * @description 自动化脚本模块，批量注册方法
 */
const fs = require('fs');

const fileName = { INDEX: 'index.js' };

module.exports = app => {
    fs.readdirSync(__dirname).forEach(file => {
        if (file === fileName.INDEX) { return; }
        const router = require(`./${file}`);
        app.use(router.routes()).use(router.allowedMethods());
    });
};