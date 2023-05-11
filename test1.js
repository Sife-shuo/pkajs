const pka = require('./lib/pka')
//创建http服务器
var f=new pka();
f.use((req,res)=>{console.log("路由触发：",req.url)})
f.get("/i/*",(req,res)=>{res.send("az")})
module.exports=f;