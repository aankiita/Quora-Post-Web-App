console.log("starting server...");

const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));


posts=[
    {
        username:"apancollege",
        content:"i love coding"
    },
    {
        username:"physicswallah",
        content:"hello baccho",
    },
    {
        username:"ankitayadav",
        content:"i m learning coding",
    },
];

app.get("/posts", (req, res) => {
    res.render("Allpostnewdatacreation.ejs",{posts});
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/posts",(req, res) => {
    console.log(req.body);
    let {username,content}=req.body;
    posts.push({username,content});
    res.redirect("/posts");
});

app.listen(port, () => {
    console.log("listeniing to port:3000");
});

