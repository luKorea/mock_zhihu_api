/**
 * @description 用户模块路由
 */
const Router = require('koa-router');
const jwt = require('koa-jwt');

const { SECRET } = require('../utils/config');
const {
    findAll,
    findById,
    update,
    delete: remove,
    login,
    authorized,
    register,
    getFollowing,
    addFollowing,
    unFollowing,
    getFollowers,
    checkUserExits,
} = require('../controllers/users');

const router = new Router({ prefix: '/user' });

// TODO 用户认证
const certification = jwt({ secret: SECRET });

// 用户登陆注册
router.post('/login', login);
router.post('/register', register);

// 获取用户关注
router.get('/:id/following', getFollowing);

// 添加关注
router.put('/following/:id', certification, checkUserExits, addFollowing);

// 取消关注
router.delete('/following/:id', certification, checkUserExits, unFollowing);

// 获取粉丝
router.get('/:id/followers', getFollowers);

// 用户增删改查
router.get('/', findAll);
router.get('/:id', findById);
router.patch('/:id', certification, authorized, update);
router.delete('/:id', certification, authorized, remove);


module.exports = router;