const pka = require('./lib/pka')
var f=new pka();
f.use((req,res)=>{console.log("Router：",req.url)})
f.get("/i/*",(req,res)=>{res.send("az")})
module.exports=f;