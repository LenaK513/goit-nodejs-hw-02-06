const { Unauthorized } = require("http-errors");

const jwt = require("jsonwebtoken");

const { User } = require("../models");

const { SECRET_KEY } = process.env;

const user = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  try {
    if (bearer !== "Bearer") {
      next(new Unauthorized("Not authorized"));
    }
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    if (!user || !user.token) {
      throw new Unauthorized("Not authorized");
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.message === "Invalid sugnature") {
      error.status = 401;
    }
    next(error);
  }
};

// const passport = require("passport");
// const passportJWT = require("passport-jwt");

// const ExtractJWT = passportJWT.ExtractJwt;
// const Strategy = passportJWT.Strategy;
// const params = {
//   secretOrKey: SECRET_KEY,
//   jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
// };

// passport.use(
//   new Strategy(params, function (payload, done) {
//     User.find({ _id: payload.id })
//       .then(([user]) => {
//         if (!user) {
//           return done(new Error("User not found"));
//         }
//         return done(null, user);
//       })
//       .catch((err) => done(err));
//   })
// );

module.exports = user;
