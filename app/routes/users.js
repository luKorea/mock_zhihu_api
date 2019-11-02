/**
 * @description 用户模块
 */
const Router = require('koa-router');
const {index, create, find, findById, update, delete: remove} = require('../controllers/users');
const router = new Router({prefix: '/user'});

router.get('/', find);
router.get('/:id', findById);
router.post('/', create);
router.patch('/:id', update);
router.delete('/:id', remove);

router.post('/login', async ctx => {
    //  TODO a.b;  测试服务器错误
    ctx.body = 'login Page';
});

module.exports = router;
