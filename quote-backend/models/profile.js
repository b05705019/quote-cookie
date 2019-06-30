const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creating a schema, sort of like working with an ORM

const ProfileSchema = new Schema({
    user_id: String,
    user_password: String,
    collected: {
        quote: String,
        author: String,
        category: String
    }
});

const Profile = mongoose.model('profiles', ProfileSchema)
console.log("establish schema: profile");

module.exports = Profile;