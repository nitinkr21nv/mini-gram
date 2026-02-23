const express = require("express");
const app = express();

const port = process.env.PORT || 8080;
const path = require("path");
const {v4: uuidv4} = require("uuid");
const methodOverride = require("method-override");



app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));



app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let profiles = [
    {
        id: uuidv4(),
        username: "Rahul",
        followers: 25,
        following: 20,
        bio: "Hii, I am Rahul Kumar"
    },
    {
        id: uuidv4(),
        username: "Aryan",
        followers: 22,
        following: 27,
        bio: "Hii, I am Aryan Kumar"
    },
    {
        id: uuidv4(),
        username: "Pankaj",
        followers: 88,
        following: 99,
        bio: "Hii, I am Pankaj"
    },
    {
        id: uuidv4(),
        username: "Aman",
        followers: 90,
        following: 22,
        bio: "Hii, I am Aman"
    }

];

app.get("/profiles", (req, res) => {
    res.render("index.ejs", {profiles});
});

app.get("/profiles/new", (req, res) => {
    res.render("new.ejs", {profiles});

});

app.post("/profiles", (req, res) => {
    let {username, bio} = req.body;
    let id = uuidv4();
    let followers = 0;
    let following = 0;
    profiles.push({id, username, bio, followers, following});
    res.redirect("/profiles");
});


app.get("/profiles/:id/show", (req, res) => {
    let {id} = req.params;
    let profile = profiles.find((p) => id === p.id);
    res.render("show.ejs", {profile});
});


app.get("/profiles/:id/edit", (req, res) => {
    let { id } = req.params;
    let profile = profiles.find((p) => id === p.id);

    res.render("edit.ejs", {profile});
});


app.patch("/profiles/:id", (req, res) => {
    let {id} = req.params;
    let newBio = req.body.bio;
    let profile = profiles.find((p) => id === p.id);
    profile.bio = newBio;
    res.redirect("/profiles");



});


app.delete("/profiles/:id", (req, res) => {
    let {id} = req.params;
    profiles = profiles.filter((p) => id !== p.id);
    res.redirect("/profiles");
});














app.listen(port, () => {
    console.log(`listening at ${port}`);

});
