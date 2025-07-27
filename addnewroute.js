console.log("starting server...");

const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const methodOverride = require('method-override');



//giving new id to each post so thatw e can access it with the id --GET  /posts/:id
const {v4:uuidv4}=require("uuid");

app.use(express.urlencoded({ extended: true }));

app.use(methodOverride('_method'));


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));


posts=[
    {
        id:uuidv4(),
        username:"apancollege",
        content:"i love coding"
    },
    {
        id:uuidv4(),
        username:"physicswallah",
        content:"hello baccho",
    },
    {
        id:uuidv4(),
        username:"ankitayadav",
        content:"i m learning coding",
    },
];

app.get("/posts", (req, res) => {
    res.render("indexroute.ejs",{posts});
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/posts",(req, res) => {
    let id=uuidv4();
    let {username,content}=req.body;
    posts.push({id,username,content});
    res.redirect("/posts");

});


app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;   //cpmes from url
    let post=posts.find((p)=>id===p.id);
    res.render("show.ejs",{post});
});


app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post});
})

//update route
app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;  //comes from we input there in hoppscotch
    let newContent=req.body.content;  //comes from url
    let post=posts.find((p)=>id===p.id);
    post.content=newContent;
    console.log(post);
    res.redirect("/posts");
})

app.delete("/posts/:id",(req,res)=>{   //posts/:id h to id yaha pass ho raha h to ek thrah s hum likh rahe h so it will be req.params
    let {id}=req.params; //comes from we wrote 
    posts=posts.filter((p)=>id!==p.id);  //new array filtered arrrat we put it name as posts as it as posts earlier
    res.redirect("/posts");
})

app.listen(port, () => {
    console.log("listeniing to port:8080");
});

