/**
 * @description 用户模块
 */
const Router = require('koa-router');
const jwt = require('koa-jwt');

const {SECRET} = require('../utils/config');
const {index, create, find,
    findById, update, delete: remove,
    login, authorized
} = require('../controllers/users');

const router = new Router({prefix: '/user'});

// TODO 用户认证
const certification = jwt({secret: SECRET});
// 用户登陆注册
router.post('/login', login);

// 用户增删改查
router.get('/', find);
router.get('/:id', findById);
router.post('/', create);
router.patch('/:id', certification, authorized, update);
router.delete('/:id', certification, authorized, remove);

router.post('/login', async ctx => {
    //  TODO a.b;  测试服务器错误
    ctx.body = 'login Page';
});

module.exports = router;
