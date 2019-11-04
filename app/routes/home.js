/**
 * @description 首页接口模块
 */

const Router = require('koa-router');
const { index, upload } = require('../controllers/home');
const router = new Router();

router.get('/', index);
router.post('/upload', upload);

module.exports = router;