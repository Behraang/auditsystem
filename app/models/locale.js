// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var localeSchema = new mongoose.Schema({
	code      		: String,
    domain        	: String,
    priceModel      : String,
    languageType    : String,
    language 		: String,
    currency		: String
},{ 
	collection: 'locale' // stop mongoose from adding an s to the collection name. Finally did it Alessio
});

// create the model for locale and expose it to our app
module.exports = mongoose.model('Locale', localeSchema);