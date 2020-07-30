var express = require("express");
var app = express();
var bodyParser = require("body-parser");

const mongoose = require("mongoose");
mongoose
	.connect("mongodb://localhost:27017/restful_blog_app", {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => console.log("Connected to DB!"))
	.catch((error) => console.log(error.message));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.listen(3000, function() {
	console.log("Example app listening on port 3000!");
});
