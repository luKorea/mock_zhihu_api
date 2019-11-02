/**
 * @description 用户控制器
 * @class Users
 */
const User = require('../modules/users');
let user = null;

class UsersController {
    async index(ctx) {
        ctx.body = await User.find();
    }

    async find(ctx) {
        ctx.body = await User.find();
    }

    async findById(ctx) {
        user = await User.findById(ctx.params.id);
        !user ? ctx.throw(404, '用户不存在') : ctx.body = user;
    }

    async create(ctx) {
        ctx.verifyParams({
            name: {type: 'string', required: true},
            password: {type: 'string', required: true}
        });
        // TODO 验证用户唯一性
        const {name} = ctx.request.body;
        const replaceUser = await User.findOne({name});
        if (replaceUser) {ctx.throw(409, '用户已经存在')}

        user = await new User(ctx.request.body).save();
        ctx.body = user;
    }

    async update(ctx) {
        ctx.verifyParams({
           name: {type: 'string', required: false},
           password: {type: 'string', required: false}
        });

        user = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body);
        !user ? ctx.throw(404, '用户不存在') : ctx.body = user;
    }

    async delete(ctx) {
        user = await User.findByIdAndRemove(ctx.params.id);
        !user ? ctx.throw(404, '用户不存在') : ctx.body = user;
        // ctx.status = 204;
    }
}

let Users = new UsersController();
module.exports = Users;
