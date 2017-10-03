// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var questionSchema = new mongoose.Schema({
	number      : String,
    text        : String,
    scale       : String,
    type        : String,
},{ 
	collection: 'question' // stop mongoose from adding an s to the collection name. Finally did it Alessio :D
});

// create the model for question and expose it to our app
module.exports = mongoose.model('Question', questionSchema);