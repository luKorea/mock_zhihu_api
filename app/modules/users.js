/**
 * 用户模型
 */
const mongoose = require('mongoose');

const {Schema, model} = mongoose;

const userSchema = new Schema({
    __v: {type: Number, select: false},
    name: {type: String, required: true},
    // TODO 过滤密码字段
    password: {type: String, required: true, select: false},
    avatar_url: {type: String},
    gender: {type: String, enum: ['male', 'female'], default: 'male', required: true},
    headline: {type: String},
    locations: {type: [ {type: String} ]},    // 数组类型
    business: {type: String},    // 行业
    employments: {
        type: [{
            company: {type: String},
            job: {type: String}
        }]
    },
    educations: {
        type: [{
            school: {type: String},
            major: {type: String},
            diploma: {type: Number, enum: [1, 2, 3, 4, 5]},  // 学历
            entrance_year: {type: String},
            graduation_year: {type: String}
        }]
    }
});

let Model = model('user', userSchema);
module.exports = Model;
