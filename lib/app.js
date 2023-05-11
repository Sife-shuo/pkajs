const sever = require("./sever")
function url_parse(path){
    return (path[0]=="/"?path.slice(1):path).replaceAll("*",".*").split("/")
}
function url_check(url,paths){
    return !(url[0]=="/"?url.slice(1):url).split("/").map((e,m)=>paths[m]?e.match(paths[m])==e?1:null:1).includes(null)
}
const addpath=(a,b)=>function(a,b){return this.c(a).concat(this.c(b))}
    .bind({c:path=>
        (path[0]=="/"?path.slice(-1)[0]=="/"?path.slice(1,-1):path.slice(1):path).replaceAll("*",".*").split("/")
    })(a,b).join("/");
class app{
    constructor(){
        this.lib={check:(url,path)=>url_check(url,url_parse(path)),addpath:addpath};
        this.fns=[];
        this.route={get:[],post:[]};
        this.num=0;
        return this;
    }
    _app(){}
    addapp(path,app){
        var choose=[app.fns,app.route.get,app.route.post];
        var an=[this.fns,this.route.get,this.route.post];
        for(var i=0;i<3;i++){
            for(var t=0;t<choose[i].length;t++){
                var f=choose[i][t];
                an[i].push([addpath(path,f[0]),f[1]])
            }
        }
    }
    use(){
        if(arguments[1]){
            if(arguments[1].__proto__.constructor.name=="app"){
                this.addapp(arguments[0],arguments[1])
            }else{
                this.fns.push([arguments[0],arguments[1]])
            }
        }else if(arguments[0]){
            this.fns.push(["*",arguments[0]])
        }
    }
    runfns(req,res){
        if(this.fns.length){
            this.num=1;
            for(var i=0;i<this.fns.length;i++){
                var g=this.fns[i];
                if(this.num==1&&this.lib.check(req.url,g[0])){  
                    this.num=0;
                    g[1](req,res,()=>{this.num=1})
                }
            }
            this.num=0;
        }
    }
    get(path,fn){
        this.route.get.push([path,fn])
        return this;
    }
    post(path,fn){
        this.route.post.push([path,fn])
        return this;
    }
    listen(port){
        sever(this,port)
    }
}
module.exports=app;