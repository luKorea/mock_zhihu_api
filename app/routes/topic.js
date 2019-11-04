/**
 * @description 话题模块路由
 */
const Router = require('koa-router');
const jwt = require('koa-jwt');

const { SECRET } = require('../utils/config');
const {
    getTopicList,
    findTopicById,
    createTopic,
    updateTopic
} = require('../controllers/topic');

const router = new Router({ prefix: '/topic' });
// 用户认证
const certification = jwt({ secret: SECRET });

router.get('/', getTopicList); // 获取话题
router.post('/', certification, createTopic); // 新建话题
router.get('/:id', findTopicById); // 获取指定话题
router.patch('/:id', certification, updateTopic); // 更新话题

module.exports = router;