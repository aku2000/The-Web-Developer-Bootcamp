// http://localhost:3000
var express = require("express");
var app = express();

// "/"->hi there
app.get("/", function(req, res) {
	res.send("HI!There");
});
// "/bye"->Goodbye
app.get("/bye", function(req, res) {
	res.send("GoodBye");
});
// "/dog"->Goodbye
app.get("/dog", function(req, res) {
	res.send("MEEEEEEEOOOOWW!!!");
});

//for a pattern:Route parameters
app.get("/r/:name", function(req, res) {
	var x = req.params.name;
	res.send("welcomeeee to " + x.toUpperCase() + " subreddit page!");
});
app.get("/r/:name/comments/:id/:title", function(req, res) {
	res.send("welcomeeee to commments pageeeee!!!");
});

// "for any other route"
app.get("*", function(req, res) {
	res.send("You are a star!!");
});

app.listen(3000, function() {
	console.log("Example app listening on port 3000!");
});
