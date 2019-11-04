/**
 * @description 用户控制器
 * @class UsersController
 */

const jwt = require('jsonwebtoken');
const User = require('../modules/users');
const { SECRET } = require('../utils/config');
let user = null;

class UsersController {

    // TODO 用户授权
    async authorized(ctx, next) {
        if (ctx.params.id !== ctx.state.user._id) {
            ctx.throw(403, '你没有权限进行此操作');
        }
        await next();
    }

    // TODO 查找所有用户
    async findAll(ctx) {
        // 模默认显示的页数
        const { per_page = 5 } = ctx.query;
        //  当前页码
        const page = Math.max(ctx.query.page * 1, 1) - 1;
        // 当前页码显示的条数
        const perPage = Math.max(per_page * 1, 1);
        ctx.body = await User.find({ name: new RegExp(ctx.query.q) }).limit(perPage).skip(page * perPage);
    }

    // TODO 查找指定用户
    async findById(ctx) {
            // TODO 字段过滤
            const { fields = '' } = ctx.query;
            const selectFields = fields.split(';')
                .filter(file => file)
                .map(file => ' +' + file)
                .join('');
            user = await User.findById(ctx.params.id).select(selectFields).populate(selectFields);
            !user ? ctx.throw(404, '用户不存在') : ctx.body = user;
        }
        // TODO 更新指定用户
    async update(ctx) {
        ctx.verifyParams({
            name: { type: 'string', required: false },
            password: { type: 'string', required: false },
            avatar_url: { type: 'string', required: false },
            gender: { type: 'string', required: false },
            headline: { type: 'string', required: false },
            locations: { type: 'array', itemType: 'string', required: false },
            business: { type: 'string', required: false },
            employments: { type: 'array', itemType: 'object', required: false },
            educations: { type: 'array', itemType: 'object', required: false }
        });
        user = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body);
        !user ? ctx.throw(404, '用户不存在') : ctx.body = user;
    }

    // TODO 删除指定用户
    async delete(ctx) {
        user = await User.findByIdAndRemove(ctx.params.id);
        !user ? ctx.throw(404, '用户不存在') : ctx.body = user;
        // ctx.status = 204;
    }

    // TODO 注册
    async register(ctx) {
        ctx.verifyParams({
            name: { type: 'string', required: true },
            password: { type: 'string', required: true }
        });
        // TODO 验证用户唯一性
        const { name } = ctx.request.body;
        const replaceUser = await User.findOne({ name });
        if (replaceUser) {
            ctx.throw(409, '用户已经存在')
        }

        user = await new User(ctx.request.body).save();
        ctx.body = {
            state: 204,
            message: '注册成功',
            id: user._id,
            name: user.name
        };
    }


    // TODO 登陆
    async login(ctx) {
        ctx.verifyParams({
            name: { type: 'string', required: true },
            password: { type: 'string', required: true }
        });
        user = await User.findOne(ctx.request.body);
        if (!user) {
            ctx.throw(401, '用户名或密码不正确')
        }

        // TODO 生成token
        const { name, _id } = user;
        const token = jwt.sign({ _id, name }, SECRET, { expiresIn: '1d' });
        ctx.body = {
            status: 200,
            message: '登陆成功',
            token
        }
    }

    // TODO 验证用户是否存在
    async checkUserExits(ctx, next) {
        user = await User.findById(ctx.params.id);
        !user ? ctx.throw(404, '用户不存在') : await next();
    }

    // TODO 获取关注列表
    async getFollowing(ctx) {
        // 获取具体用户信息
        user = await User.findById(ctx.params.id).select('+following').populate('following');
        !user ? ctx.throw(404, '查找的用户不存在') : ctx.body = user.following;
    }

    // TODO 添加关注
    async addFollowing(ctx) {
        const me = await User.findById(ctx.state.user._id).select('+following');
        const filterMe = me.following.map(id => id.toString());
        // 判断列表中是否已存在某个粉丝
        if (!filterMe.includes(ctx.params.id)) {
            me.following.push(ctx.params.id);
            me.save();
        }
        ctx.body = {
            status: 200,
            message: '添加关注成功',
            ['关注人']: me.following
        }

    }

    // TODO 取消关注
    async unFollowing(ctx) {
        const me = await User.findById(ctx.state.user._id).select('+following');
        const filterMe = me.following.map(id => id.toString());
        const index = filterMe.indexOf(ctx.params.id);
        // 删除指定用户
        if (index > -1) {
            me.following.splice(index, 1);
            me.save();
        }
        ctx.body = {
            state: 200,
            message: '取消关注成功'
        }
    }

    // TODO 获取粉丝
    async getFollowers(ctx) {
        user = await User.find({ following: ctx.params.id });
        !user ? ctx.throw(404, '查找的用户不存在') : ctx.body = user;
    }
}

let usersController = new UsersController();
module.exports = usersController;