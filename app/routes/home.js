/**
 * @description 首页接口模块
 */

const Router = require('koa-router');
const { index } = require('../controllers/home');
const router = new Router();

router.get('/', index);

module.exports = router;
