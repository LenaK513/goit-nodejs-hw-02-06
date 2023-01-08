const express = require("express");

const router = express.Router();

const { contacts: cntrFc } = require("../../controllers");

router.get("/", cntrFc.getAll);

router.get("/:id", cntrFc.getContactById);

router.post("/", cntrFc.addContact);

router.delete("/:id", cntrFc.deleteContact);

router.put("/:id", cntrFc.updateContact);

module.exports = router;
