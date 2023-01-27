const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const { User } = require("../models");
require("dotenv").config();
const secret = process.env.SECRET_KEY;
const passportJWT = require("passport-jwt");

const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;

passport.use(
  "register",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const userExists = await User.findOne({ email });
        if (userExists) {
          return done(null, false);
        }
        const user = await User.create({ email, password });
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { message: "Email or password is wrong" });
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
          return done(null, false, { message: "Email or password is wrong" });
        }
        return done(null, user, { message: "Logged in Successfully" });
      } catch (error) {
        return done(error);
      }
    }
  )
);

const params = {
  secretOrKey: secret,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new Strategy(params, function (payload, done) {
    console.log(payload);
    User.find({ id: payload.id })
      .then(([user]) => {
        if (!user) {
          return done(new Error("User not found"));
        }
        return done(null, user);
      })
      .catch((err) => done(err));
  })
);

module.exports = passport;
