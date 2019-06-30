const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const Post = require('./post')

// Creating a schema, sort of like working with an ORM

const KeySchema = new Schema({
	key: String,
	time: Number
});

// Creating a table within database with the defined schema
const Key = mongoose.model('keys', KeySchema)
console.log("establish schema: key");
// Exporting table for querying and mutating
module.exports = Key;
