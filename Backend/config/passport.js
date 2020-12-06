"use strict";
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const login = require('../models/login_credentials');
var jwt = require('jwt-simple');
const config = require("../dbConnections/mongoose");

// Setup work and export for the JWT passport strategy
function auth() {
    console.log("Hitting auth")
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: config.JWTPASSWORD
    };
    passport.use(
        new JwtStrategy(opts, (jwt_payload, callback) => {
            console.log("Creating token" + JSON.stringify(jwt_payload))
            LoginCredentials.find({ email_id: jwt_payload.username }, (err, results) => {
                if (err) {
                    return callback(err, false);
                }
                if (results) {
                    callback(null, results);
                }
                else {
                    callback(null, false);
                }
            });
        })
    )
}

exports.auth = auth;
exports.checkAuth = passport.authenticate("jwt", { session: false });