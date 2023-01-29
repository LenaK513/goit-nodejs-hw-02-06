const express = require("express");
// const passport = require("passport");
// const jwt = require("jsonwebtoken");
const router = express.Router();
// const { SECRET_KEY } = process.env;
const { user } = require("../../middlewares");

const { users: usersController } = require("../../controllers");

router.post(
  "/register",
  // passport.authenticate("register", { session: false }),
  // async (req, res, next) => {
  //   res.json({
  //     message: "Register successful",
  //     user: req.user,
  //   });
  // },
  usersController.register
);

router.post(
  "/login",
  // passport.authenticate("login", { session: false }),
  // (req, res, next) => {
  //   const payload = {
  //     id: user._id,
  //   };
  //   jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" }, (err, token) => {
  //     if (err) {
  //       return res.json({
  //         message: "Failed to login",
  //         token: null,
  //       });
  //     }
  //     res.json({ token });
  //   });
  // },

  usersController.login
);

router.get(
  "/current",
  user,
  // passport.authenticate("jwt", { session: false }),
  // (req, res) => {
  //   res.json({ user: req.user });
  // },
  usersController.getCurrent
);

router.post(
  "/logout",
  user,
  // passport.authenticate("jwt", { session: false }),
  // (req, res, next) => {
  //   res.json({ user: req.user });
  // }

  usersController.logout
);

router.patch(
  "/subscription",
  user,
  // passport.authenticate("jwt", { session: false }),
  // (req, res, next) => {
  //   res.json({ user: req.user });
  // },

  usersController.updateSubscription
);

module.exports = router;
