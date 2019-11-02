# mock_zhihu_api
仿知乎API
## 运用koa搭建restFulAPI
<hr>

```
1. npm i koa
2. npm i koa-bodyParser
3. npm i koa-router
4. npm i koa-json-error
5. npm i cross-env -D
```
## 使用 koa-json-error 处理错误
> npm i koa-json-error
```js
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    ctx.status = e.status || e.statusCode || 500;
    ctx.body = {
      status: e.status || e.statusCode || 500,
      message: e.message
    }
  }
```

## 配置不同环境运行不同命令
```json
{
      "start": "nodemon app",
      "build": "cross-env NODE_ENV=production node app"
}
```

## 使用koa-parameter 校验参数
> npm i koa-parameter

## 使用mongoose连接mongodb
> npm i mongoose
## 使用 jsonwebtoken 进行用户权限认定
> npm i jsonwebtoken
```js
const jwt = require('jsonwebtoken');
// secret 密钥
const token = jwt.sign({name: 'korea'}, 'secret'); 
jwt.verify(token, 'secret');
```
