/**
 * @description 话题控制器
 * @class TopicController
 */

const Topic = require('../modules/topic');
let topic = null;

class TopicController {

    // TODO 获取话题列表
    async getTopicList(ctx) {
        // 默认显示3项
        const { per_page = 10 } = ctx.query;
        //  当前页码
        const page = Math.max(ctx.query.page * 1, 1) - 1;
        //  当前页显示的条数
        const perPage = Math.max(per_page * 1, 1);
        // TODO 分页过滤，一次显示10条，后面显示从第11条开始显示
        // { name: new RegExp(ctx.query.q) } 实现模糊搜索
        ctx.body = await Topic.find({ name: new RegExp(ctx.query.q) }).limit(perPage).skip(page * perPage);
    }

    // TODO 获取指定话题
    async findTopicById(ctx) {
        const { fields = '' } = ctx.query;
        const selectFields = fields.split(';')
            .filter(file => file)
            .map(file => ' +' + file)
            .join('');
        topic = await Topic.findById(ctx.params.id).select(selectFields);
        ctx.body = topic;
    }

    // TODO 创建话题
    async createTopic(ctx) {
        ctx.verifyParams({
            name: { type: 'string', required: true },
            avatar_url: { type: 'string', required: false },
            introduction: { type: 'string', required: false }
        });
        topic = await new Topic(ctx.request.body).save();
        ctx.body = topic;
    }

    // TODO 修改话题
    async updateTopic(ctx) {
        ctx.verifyParams({
            name: { type: 'string', required: false },
            avatar_url: { type: 'string', required: false },
            introduction: { type: 'string', required: false }
        });
        topic = await Topic.findByIdAndUpdate(ctx.params.id, ctx.request.body);
        ctx.body = topic;
    }
}

let topicController = new TopicController();
module.exports = topicController;