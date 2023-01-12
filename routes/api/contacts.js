const express = require("express");

const router = express.Router();

const { contacts: contactsController } = require("../../controllers");

router.get("/", contactsController.getAll);

router.get("/:id", contactsController.getContactById);

router.post("/", contactsController.addContact);

router.delete("/:id", contactsController.deleteContact);

router.put("/:id", contactsController.updateContact);

module.exports = router;
