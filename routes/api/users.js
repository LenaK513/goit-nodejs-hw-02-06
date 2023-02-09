const express = require("express");

const router = express.Router();

const { user, upload } = require("../../middlewares");

const { users: usersController } = require("../../controllers");

router.post("/register", usersController.register);

router.post("/login", usersController.login);

router.get("/verify/:verificationToken", usersController.verifyEmail);

router.post("/verify", usersController.resendVerifyEmail);

router.get("/current", user, usersController.getCurrent);

router.post("/logout", user, usersController.logout);

router.patch("/subscription", user, usersController.updateSubscription);

router.patch(
  "/avatars",
  user,
  upload.single("avatar"),
  usersController.updateAvatar
);

module.exports = router;
