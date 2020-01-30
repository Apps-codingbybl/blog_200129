//app.js

//jshint esversion:6
const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. ";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. ";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. ";
let posts = [];

// create home route
app.get("/", function(req,res) {
  res.render("home", {homeIntro: homeStartingContent, posts: posts})
});
app.get("/about", function(req,res) {
  res.render("about", {aboutIntro: aboutContent})
});
app.get("/contact", function(req,res) {
  res.render("contact", {contactIntro: contactContent})
});
app.get("/compose", function(req,res) {
  res.render("compose")
});
app.get('/posts/:postName', function (req, res) {
  // console.log(req.params.postName)
  const requestedTitle = req.params.postName;
  posts.forEach(function(post){
    const storedTitle = post.title;
    if (storedTitle === requestedTitle){
      console.log("Match found!");
    }
  });
});

app.post("/compose", function(req,res) {
  // let post = req.body.postTitle + "\n" + req.body.postBody;
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };
  posts.push(post);
  res.redirect("/");
  //console.log(posts);
});


app.listen(process.env.PORT || 3100, function() {
    console.log('Server running on port 3100 \nurl localhost:3100')
});
