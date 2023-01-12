const { contactSchema } = require("../../schemas");
const contactsOperations = require("../../models/index");

const addContact = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: `missing  ${error.message}`,
      });
      return;
    }
    const { name, email, phone } = req.body;
    const contact = await contactsOperations.addContact(name, email, phone);

    res.status(201).json({ status: "success", code: 201, data: contact });
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
