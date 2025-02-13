const { joiSchema } = require("../../models/contact");
const { Contact } = require("../../models");

const addContact = async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      res.status(400).json({
        message: `missing  ${error.message}`,
      });
      return;
    }
    const { _id } = req.user;
    const contact = await Contact.create({ ...req.body, owner: _id });

    res.status(201).json({ status: "success", code: 201, data: contact });
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
