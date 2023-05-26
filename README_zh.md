# pka

一个现代化的极小的可快速运行的web框架（小于3.5kb）。

# 安装
```shell
npm install pka
```
# 基本语法
你可以使用node原生的`req`,`res`来操作，支持中间件，路径匹配
```javascript
const pka = require('pka')
var f=new pka();
f.use("*",(req,res,next)=>{res.setHeader("Access-Control-Allow-Origin", "*")};
f.get("/",(req,res)=>{
    res.send("Hello World!")
});
f.listen(3000,()=>{console.log("Run on 3000")})
```
同时支持链式调用
```javascript
const pka = require('pka')
var f=new pka();
f.use("*",(req,res,next)=>{res.setHeader("Access-Control-Allow-Origin", "*");console.log(req.method,req.url);next()}).post("/api/*",(req,res)=>{
    console.log(req.body);
    res.send("Hello World!")
}).listen(3000,()=>{console.log("Run on 3000")})
```
路由配置（pka的路由和主服务使用同一个构造函数，也就是说你可以单独启动路由或者将主服务作为其他服务的路由使用）

文件 test.js
```javascript
const pka = require('pka')
var f=new pka();
f.use("*",(req,res,next)=>{res.setHeader("Access-Control-Allow-Origin", "*");console.log(req.method,req.url);next()});
f.use("/r",require("./test1")).listen(3000,()=>{console.log("Hello World!")})
```
文件 test1.js
```javascript
const pka = require('pka')
var f=new pka();
f.get("/i",(req,res)=>{console.log("Router：",req.url);res.send("This is Router")});
module.exports=f;
```
在上述事例中运行test.js将会启动web服务，向127.0.0.1:3000/r/i发送GET就会收到数据