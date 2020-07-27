var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

var friends = [ "tony", "miranda", "justin", "lilly", "aku baby" ];

app.get("/", function(req, res) {
	res.render("home");
});
app.get("/fallinlovewith/:thing", function(req, res) {
	var thing = req.params.thing;
	res.render("love", { thingVar: thing });
});
app.get("/posts", function(req, res) {
	var posts = [
		{ title: "post 1", author: "Susy" },
		{ title: "My adorable pet bunny", author: "Charly" },
		{ title: "can you believe ", author: "aku" }
	];
	res.render("posts", { posts: posts });
});
app.post("/addfriend", function(req, res) {
	var newFriend = req.body.newFriend;
	friends.push(newFriend);
	res.redirect("/friends");
});
app.get("/friends", function(req, res) {
	res.render("friends", { friends: friends });
});
app.listen(3000, function() {
	console.log("Example app listening on port 3000!");
});
