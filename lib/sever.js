const http = require('http')
function sever(app,port){
var lib=app.lib;
console.log(app)
http.createServer((req,res)=>{
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
}).listen(port,'127.0.0.1',()=>{
    console.log('服务器已启动，运行在9000端口上...')
})
}
module.exports=sever;