console.log("starting server...");

const express = require("express");
const app = express();
const port = 8080;
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
    res.render("indexroute.ejs",{posts});
});

app.listen(port, () => {
    console.log("listeniing to port:8080");
});

