const expressJwt = require('express-jwt');
const secret = require('../config');

module.exports = jwt;

function jwt() {
    return expressJwt({ secret }).unless({
        path: [
            // public routes that don't require authentication
            '/users/authenticate'
        ]
    });
}
