var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var Campground = require("./models/campground");

const mongoose = require("mongoose");
mongoose
	.connect("mongodb://localhost:27017/yelp_camp", {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => console.log("Connected to DB!"))
	.catch((error) => console.log(error.message));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Campground.create(
// 	{
// 		name: "Granite Hill",
// 		image:
// 			"https://images.unsplash.com/photo-1526491109672-74740652b963?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60",
// 		description: "This is a huge gramite hill. Sorry no water but it is a beauty for sure!!!!"
// 	},
// 	function(err, campground) {
// 		if (err) {
// 			console.log(err);
// 		} else {
// 			console.log("Newly created camp");
// 			console.log(campground);
// 		}
// 	}
// );

app.get("/", function(req, res) {
	res.render("landing");
});
app.get("/campgrounds", function(req, res) {
	//get all campgrounds from db and render the function
	Campground.find({}, function(err, allCampgrounds) {
		if (err) {
			console.log(err);
		} else {
			res.render("index", { campgrounds: allCampgrounds });
		}
	});
});

app.post("/campgrounds", function(req, res) {
	//get data from form and add to campgrounds page
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCampground = {
		name: name,
		image: image,
		description: desc
	};
	//Creare a new campground and save to database
	Campground.create(newCampground, function(err, newlycreated) {
		if (err) {
			console.log(err);
		} else {
			//redirect back to campgrounds page
			res.redirect("/campgrounds");
		}
	});
});

app.get("/campgrounds/new", function(req, res) {
	res.render("new");
});

//SHOW-shows more info about 1 campground
app.get("/campgrounds/:id", function(req, res) {
	//find the campground with provided ID
	Campground.findById(req.params.id, function(err, foundCampground) {
		if (err) {
			console.log(err);
		} else {
			//render show template with campground
			res.render("show", { campground: foundCampground });
		}
	});
});

app.listen(3000, function() {
	console.log("Example app listening on port 3000!");
});
