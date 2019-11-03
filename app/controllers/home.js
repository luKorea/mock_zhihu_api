/**
 * @description 首页控制器
 * @class Home
 */
const path = require('path');

class HomeController {
    async index(ctx) {
        ctx.body = '这是首页';
    }
    // TODO 文件上传
    async upload(ctx) {
        const file = await ctx.request.files.file;
        // 图片路径生成
        const basename = path.basename(file.path);
        ctx.body = {
            status: 200,
            message: '图片上传成功',
            url: `${ctx.origin}/uploads/${basename}`
        }
    }
}
let Home = new HomeController();
module.exports = Home;
