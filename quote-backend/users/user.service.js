const secret = require('../config');
const jwt = require('jsonwebtoken');

// users hardcoded for simplicity, store in a db for production applications
// const users = [{ id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' }];

// Connect to mongo
// mongoose.connect('mongodb+srv://shihyun:0000@cluster0-w423m.gcp.mongodb.net/test?retryWrites=true&w=majority', {
//     useNewUrlParser: true
// })
// db = mongoose.connection

module.exports = {
    authenticate,
    // getAll
};

async function authenticate({ username, password }) {

    db.on('error', error => {
        console.log(error);
    });

    let profile = db.collection("profiles");
    
    const response =  await profile.findOne({user_id: username, user_password: password});
    const token = jwt.sign({ sub: response.user_id }, secret);
    // response;
    return {
        result: { username: response.user_id,
        collected: response.collected},
        token: token
    };
    
}

// async function getAll() {
//     return users.map(u => {
//         const { password, ...userWithoutPassword } = u;
//         return userWithoutPassword;
//     });
// }
