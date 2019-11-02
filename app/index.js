/**
 * @description 入口文件
 */
const Koa = require('koa');
const app = new Koa();

// 数据处理
const bodyParser = require('koa-bodyparser');
const parameter = require('koa-parameter');
const error = require('koa-json-error');

// 自定义模块
const {CONNECT, PORT} = require('./utils/config');
const routing = require('./routes');

// 连接数据库
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


// TODO 错误中间处理器
app.use(error({
    postFormat: (e, {stack, ...rest}) => {
        // stack  错误堆栈信息
        // 判断当前环境，生产环境不返回stack
        return process.env.NODE_ENV === 'production' ? rest : {stack, ...rest}
    }
}));

// 使用body parser中间件解析post数据
app.use(bodyParser());
app.use(parameter(app)); // 校验param参数
routing(app);

app.listen(PORT, () => console.log(`server open in http://127.0.0.1:${PORT}`));
