const express = require("express");

const router = express.Router();

const { user } = require("../../middlewares");
const { contacts: contactsController } = require("../../controllers");

router.get("/", user, contactsController.getAll);

router.get("/:id", contactsController.getContactById);

router.post("/", user, contactsController.addContact);

router.delete("/:id", contactsController.deleteContact);

router.put("/:id", contactsController.updateContact);

router.patch("/:id/favorite", contactsController.updateFavorite);
module.exports = router;
