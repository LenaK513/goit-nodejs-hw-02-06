const express = require("express");

const router = express.Router();

const { user } = require("../../middlewares");

const { users: usersController } = require("../../controllers");

router.post("/register", usersController.register);

router.post("/login", usersController.login);

router.get("/current", user, usersController.getCurrent);

router.post("/logout", user, usersController.logout);

router.patch("/subscription", user, usersController.updateSubscription);

module.exports = router;
