/**
 * @description 入口文件
 */
const Koa = require('koa');
const path = require('path');
const app = new Koa();

// 数据处理
const koaBody = require('koa-body');
const koaStatic = require('koa-static');
const parameter = require('koa-parameter');
const error = require('koa-json-error');

// 自定义模块
const {CONNECT, PORT} = require('./utils/config');
const routing = require('./routes');

// TODO 连接数据库
const mongoose = require('mongoose');
mongoose.connect(CONNECT,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
    },
    () => console.log('数据库连接成功')
);
mongoose.connection.on('error', console.error);


// 中间件
app.use(koaStatic(path.join(__dirname, 'public')));

// TODO 错误中间处理器
app.use(error({
    postFormat: (e, {stack, ...rest}) => {
        // stack  错误堆栈信息
        // 判断当前环境，生产环境不返回stack
        return process.env.NODE_ENV === 'production' ? rest : {stack, ...rest}
    }
}));

// TODO 使用 koa-body 解析MIME数据
app.use(koaBody({
    multipart: true,    // 支持文件上传
    formidable: {
        uploadDir: path.join(__dirname, '/public/uploads'),  // 上传目录
        keepExtensions: true,   // 保留拓展名
    }
}));

// 校验param参数
app.use(parameter(app));

// 注册路由
routing(app);

app.listen(PORT, () => console.log(`server open in http://127.0.0.1:${PORT}`));
