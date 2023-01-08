const { NotFound } = require("http-errors");

const { contactSchema } = require("../../schemas");

const contactsOperations = require("../../models/index");

const updateContact = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: `missing  field ${error.message}`,
      });
      return;
    }
    const { id } = req.params;
    const { name, email, phone } = req.body;
    const contact = await contactsOperations.updateContact(
      id,
      name,
      email,
      phone
    );
    if (!contact) {
      throw new NotFound(`Product with id=${id} not found`);
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        contact,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateContact;
