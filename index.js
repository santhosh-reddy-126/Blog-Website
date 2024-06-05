import express from "express";
import bodyParser from "body-parser";

const port = 3000;
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
let title=[];
let cont = [];
let title2=[];

function titles(a){
    for(let j =0;j<a.length;j++){
        if(a[j]===" "){
            a=a.substring(0,j)+"*"+a.substring(j+1);
        }
    }
    return a;
}



app.listen(port,()=>{
    console.log("server on 3000 port");
})

app.get("/",(req,res)=>{
    res.render("index.ejs");
})

app.get("/create",(req,res)=>{
    res.render("create.ejs");
})

app.post("/created",(req,res)=>{
    title.push(req.body["title"]);
    title2.push(titles(req.body["title"]))
    cont.push(req.body["content"]);
    res.render("create.ejs");
    for(let i=0;i<title.length;i++){
        app.get("/"+title2[i],(req,res)=>{
            res.render("p.ejs",{
                title: title[i],
                cont: cont[i]
            })
        })
    }
})

app.get("/view",(req,res)=>{
    res.render("view.ejs",{title: title,cont: cont});
})

