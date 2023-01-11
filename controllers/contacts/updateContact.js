const { NotFound } = require("http-errors");

const contactsOperations = require("../../models/index");

const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { ...data } = req.body;
    if (!data) {
      next(new NotFound(`Missing fields`));
    }

    const contact = await contactsOperations.updateContact(id, data);
    if (!contact) {
      next(new NotFound(`Product with id=${id} not found`));
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
