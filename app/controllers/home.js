/**
 * @description 首页控制器
 * @class Home
 */
class HomeController {
    index(ctx) {
        ctx.body = '这是首页';
    }
}
let Home = new HomeController();
module.exports = Home;
