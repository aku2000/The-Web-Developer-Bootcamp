const mongoose = require("mongoose");

//SCHEMA SETUP
var campgroundschema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

module.exports = mongoose.model("Campground", campgroundschema);
