var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var expressSanitizer = require("express-sanitizer");
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
//always after body parser
app.use(expressSanitizer());
app.use(express.static("public"));
app.use(methodOverride("_method"));

//SCHEMA ->mongoose model config
var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: { type: Date, default: Date.now }
});
//compile Schema into model
var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
// 	title: "COVID-19",
// 	image:
// 		"https://images.unsplash.com/photo-1591034455539-0352f7ed55ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60",
// 	body: "The new norm -> deserted places, hige gigantic masks.... Best of lick on surviving... :("
// });

//RESTFUL ROUTES
app.get("/", function(req, res) {
	res.redirect("/blogs");
});
//INDEX ROUTE
app.get("/blogs", function(req, res) {
	Blog.find({}, function(err, blogs) {
		if (err) {
			console.log("ERROR!!");
		} else {
			res.render("index", { blogs: blogs });
		}
	});
});

//NEW ROUTE
app.get("/blogs/new", function(req, res) {
	res.render("new");
});

//CREATE ROUTE
app.post("/blogs", function(req, res) {
	//create blog
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.create(req.body.blog, function(err, newBlog) {
		if (err) {
			res.render("new");
		} else {
			//redirect to index
			res.redirect("/blogs");
		}
	});
});

//SHOW ROUTE
app.get("/blogs/:id", function(req, res) {
	Blog.findById(req.params.id, function(err, foundBlog) {
		if (err) {
			res.redirect("/blogs");
		} else {
			res.render("show", { blog: foundBlog });
		}
	});
});

//EDIT ROUTE
app.get("/blogs/:id/edit", function(req, res) {
	Blog.findById(req.params.id, function(err, foundBlog) {
		if (err) {
			res.redirect("/blogs");
		} else {
			res.render("edit", { blog: foundBlog });
		}
	});
});

//UPDATE ROUTE
app.put("/blogs/:id", function(req, res) {
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog) {
		if (err) {
			res.redirect("/blogs");
		} else {
			res.redirect("/blogs/" + req.params.id);
		}
	});
});

//DELETE ROUTE
app.delete("/blogs/:id", function(req, res) {
	//destroy blog and redirect
	Blog.findByIdAndRemove(req.params.id, function(err, updatedBlog) {
		if (err) {
			res.redirect("/blogs");
		} else {
			res.redirect("/blogs");
		}
	});
});

app.listen(3000, function() {
	console.log("Example app listening on port 3000!");
});