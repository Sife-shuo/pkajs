const http = require('http')
function sever(app,a){
var lib=app.lib;
console.log(app)
var f=http.createServer((req,res)=>{
    res.send=res.end;
    app.runfns(req,res);
    var PostData = "";
    req.on("data",(chunk)=>{
        PostData += chunk;
    });
    req.on("end",()=>{
        if (req.method == "GET") {
            var lock=0;
            for(var i=0;i<app.route.get.length;i++){
                if(!lock){
                    var kid=app.route.get[i];
                    if(lib.check(req.url,kid[0])){
                        kid[1](req,res);
                        lock=1;
                    }
                }
            }
            if(lock==0){res.send("undefined")}
        }else if (req.method == "POST"){
            req.body=JSON.parse(PostData);
            var lock=0;
            for(var i=0;i<app.route.post.length;i++){
                if(!lock){
                    var kid=app.route.post[i];
                    if(lib.check(req.url,kid[0])){
                        kid[1](req,res);
                        lock=1;
                    }
                }
            }
            if(lock==0){res.send("undefined")}
        }
    });
});
f.listen.apply(f,a)
}
module.exports=sever;