var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

var campgrounds = [
	{
		name: "Salmon creek",
		image:
			"https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60"
	},
	{
		name: "Grannite Hill",
		image:
			"https://images.unsplash.com/photo-1478827536114-da961b7f86d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
	},
	{
		name: "Aku's Paradise",
		image:
			"https://images.unsplash.com/photo-1470246973918-29a93221c455?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
	}
];

app.get("/", function(req, res) {
	res.render("landing");
});
app.get("/campgrounds", function(req, res) {
	res.render("campgrounds", { campgrounds: campgrounds });
});

app.post("/campgrounds", function(req, res) {
	//get data from form and add to campgrounds page
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {
		name: name,
		image: image
	};
	campgrounds.push(newCampground);
	//redirect back to campgrounds page
	res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res) {
	res.render("new");
});

app.listen(3000, function() {
	console.log("Example app listening on port 3000!");
});
