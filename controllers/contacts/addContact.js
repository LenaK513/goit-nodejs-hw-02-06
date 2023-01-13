const { joiSchema } = require("../../models/contact");
const { Contact } = require("../../models");

const addContact = async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: `missing  ${error.message}`,
      });
      return;
    }

    const contact = await Contact.create(req.body);

    res.status(201).json({ status: "success", code: 201, data: contact });
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
