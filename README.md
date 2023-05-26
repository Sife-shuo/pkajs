# pka

Languages:
- [English](./)
- [简体中文](./README_zh.md)


A modern and minimal web framework that can run quickly (less than 3.5kb).

# Install
```shell
npm install pka
```
# Usage
You can use node native `req`,`res` to write, support middleware, path matching.
```javascript
const pka = require('pka')
var f=new pka();
f.use("*",(req,res,next)=>{res.setHeader("Access-Control-Allow-Origin", "*")};
f.get("/",(req,res)=>{
    res.send("Hello World!")
});
f.listen(3000,()=>{console.log("Run on 3000")})
```
Simultaneously supports chain calling
```javascript
const pka = require('pka')
var f=new pka();
f.use("*",(req,res,next)=>{res.setHeader("Access-Control-Allow-Origin", "*");console.log(req.method,req.url);next()}).post("/api/*",(req,res)=>{
    console.log(req.body);
    res.send("Hello World!")
}).listen(3000,()=>{console.log("Run on 3000")})
```
Routing configuration (PKA's routing and main service use the same constructor, which means you can start the routing separately or use the main service as a routing for other services).

File test.js
```javascript
const pka = require('pka')
var f=new pka();
f.use("*",(req,res,next)=>{res.setHeader("Access-Control-Allow-Origin", "*");console.log(req.method,req.url);next()});
f.use("/r",require("./test1")).listen(3000,()=>{console.log("Hello World!")})
```
File test1.js
```javascript
const pka = require('pka')
var f=new pka();
f.get("/i",(req,res)=>{console.log("Router：",req.url);res.send("This is Router")});
module.exports=f;
```
In the above example, running test.js will start the web service, and sending GET to 127.0.0.1:3000/r/i will receive the data.