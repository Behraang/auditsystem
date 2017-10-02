// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var responseSchema = new mongoose.Schema({
	survey_v	 : String,
    //timestamp 	 : { type : Date, default: Date.now },
    username     : String,
    environment	 : String,
    adv_name	 : String,
    locale	 	 : String,
    q1			 : String,
    q2			 : String,
    q3			 : String
},{ 
	collection: 'response' // stop mongoose from adding an s to the collection name. Finally did it Alessio :D
					   // although the version __v still remains!
});

// create the model for response and expose it to our app
module.exports = mongoose.model('Response', responseSchema);