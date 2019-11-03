/**
 * @description 用户控制器
 * @class USERs
 */

const jwt = require('jsonwebtoken');

const USER = require('../modules/users');
const {SECRET} = require('../utils/config');
let user = null;

class USERsController {

    // TODO 用户授权
    async authorized(ctx, next) {
        if (ctx.params.id !== ctx.state.user._id) {
            ctx.throw(403, '你没有权限进行此操作');
        }
        await next();
    }


    async index(ctx) {
        ctx.body = await USER.find();
    }

    async find(ctx) {
        ctx.body = await USER.find();
    }

    async findById(ctx) {
        user = await USER.findById(ctx.params.id);
        !user ? ctx.throw(404, '用户不存在') : ctx.body = user;
    }

    async create(ctx) {
        ctx.verifyParams({
            name: {type: 'string', required: true},
            password: {type: 'string', required: true}
        });
        // TODO 验证用户唯一性
        const {name} = ctx.request.body;
        const replaceUSER = await USER.findOne({name});
        if (replaceUSER) {
            ctx.throw(409, '用户已经存在')
        }

        user = await new USER(ctx.request.body).save();
        ctx.body = user;
    }

    async update(ctx) {
        ctx.verifyParams({
            name: {type: 'string', required: false},
            password: {type: 'string', required: false},
            avatar_url: {type: 'string', required: false},
            gender: {type: 'string', required: false},
            headline: {type: 'string', required: false},
            locations: {type: 'array', itemType: 'string', required: false},
            business: {type: 'string', required: false},
            employments: {type: 'array', itemType: 'object', required: false},
            educations: {type: 'array', itemType: 'object', required: false}
        });
        user = await USER.findByIdAndUpdate(ctx.params.id, ctx.request.body);
        !user ? ctx.throw(404, '用户不存在') : ctx.body = user;
    }

    async delete(ctx) {
        user = await USER.findByIdAndRemove(ctx.params.id);
        !user ? ctx.throw(404, '用户不存在') : ctx.body = user;
        // ctx.status = 204;
    }

    // 登陆
    async login(ctx) {
        ctx.verifyParams({
            name: {type: 'string', required: true},
            password: {type: 'string', required: true}
        });
        user = await USER.findOne(ctx.request.body);
        if (!user) {
            ctx.throw(401, '用户名或密码不正确')
        }
        // TODO 生成token
        const {name, _id} = user;
        const token = jwt.sign({_id, name}, SECRET, {expiresIn: '1d'});
        ctx.body = {
            status: 200,
            message: '登陆成功',
            token
        }
    }
}

let USERs = new USERsController();
module.exports = USERs;
