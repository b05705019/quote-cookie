const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const Post = require('./post')

// Creating a schema, sort of like working with an ORM

const QuoteSchema = new Schema({
	Quote: String,
	Author: String,
	Tags: Array,
	Popularity: Number,
	Category: String
});

// Creating a table within database with the defined schema
const Quote = mongoose.model('quote_cookies', QuoteSchema)
console.log("establish schema: wall");
// Exporting table for querying and mutating
module.exports = Quote;
