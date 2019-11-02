/**
 * 用户模型
 */
const mongoose = require('mongoose');

const {Schema, model} = mongoose;

const userSchema = new Schema({
    __v: {type: Number, select: false},
    name: {type: String, required: true},
    // TODO 过滤密码字段
    password: {type: String, required: true, select: false}
});

let Model = model('user', userSchema);
module.exports = Model;
