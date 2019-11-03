# 仿知乎API
#### 1. 使用 koa 搭建服务器
> npm i koa
#### 2. 使用 koa-bodyParser,解析body中的数据(只支持form，json数据)
> npm i koa-bodyParser
#### 3. 使用 koa-router 进行路由配置
> npm i koa-router
#### 4. 使用 koa-json-error 处理错误
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

#### 5. 使用 cross-env 配置不同环境运行不同命令
```json
{
      "start": "nodemon app",
      "build": "cross-env NODE_ENV=production node app"
}
```

#### 6. 使用koa-parameter 校验参数
> npm i koa-parameter

#### 7. 使用mongoose连接mongodb
> npm i mongoose
#### 8. 使用 jsonWebToken 进行用户权限认定
> npm i jsonwebtoken
```js
const jwt = require('jsonwebtoken');
// secret 密钥
const token = jwt.sign({name: 'korea'}, 'secret'); 
jwt.verify(token, 'secret');
```
#### 9. 自动化脚本，实现全局配置token
```js
    var jsonData = pm.response.json();
    pm.globals.set("token", jsonData.token);
```
#### 10. 使用koa-jwt进行用户认证授权
> npm i koa-jwt
#### 11. 使用koa-body获取用户上传的文件(支持多种MIME),删除 koa-bodyParser
> npm i koa-body
> npm uninstall koa-bodyParser 
#### 12. 使用koa-static生成图片链接
> npm i koa-static
