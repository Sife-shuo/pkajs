const pka = require('./lib/pka')
//创建http服务器
var f=new pka();
f.use("*",(req,res,next)=>{res.setHeader("Access-Control-Allow-Origin", "*");console.log(req.method,req.url);next()});
f.use("/router/*u/",require("./test1"))
f.get("/pka",(req,res)=>{
    res.send("Hello World!")
}).post("/api/*",(req,res)=>{
    console.log(req.body);
    res.send("OK")
}).listen(3000)