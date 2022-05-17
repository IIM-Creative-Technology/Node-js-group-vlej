const bcrypt = require("bcryptjs");
const User = require("../models/users-model");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

// Local Strategy

function register(user){
    var email = user.email;
    var password = user.password;
    passport.use(
        new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
            // Match User
            User.findOne({ email: email })
                .then(user => {
                    // Create new User
                    if (!user) {
                        const newUser = new User({ email: email, password: password });
                        // Hash password before saving in database
                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(newUser.password, salt, (err, hash) => {
                                if (err) throw err;
                                newUser.password = hash;
                                newUser
                                    .save()
                                    .then(user => {
                                        return done(null, user);
                                    })
                                    .catch(err => {
                                        return done(null, false, { message: err });
                                    });
                            });
                        });
                        // Return other user
                    } else {
                        // Match password
                        return done(null, false, { message: "L'utilisateur existe déjà"})
                    }
                })
                .catch(err => {
                    return done(null, false, { message: err });
                });
        })
    );
}


module.exports = passport;