var express = require("express");
var app = express();
var bodyParser = require("body-parser");

//APP config
const mongoose = require("mongoose");
mongoose
	.connect("mongodb://localhost:27017/restful_blog_app", {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => console.log("Connected to DB!"))
	.catch((error) => console.log(error.message));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//SCHEMA ->mongoose model config
var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: { type: Date, default: Date.now }
});
//compile Schema into model
var Blog = mongoose.model("Blog", blogSchema);

//RESTFUL ROUTES

app.listen(3000, function() {
	console.log("Example app listening on port 3000!");
});
