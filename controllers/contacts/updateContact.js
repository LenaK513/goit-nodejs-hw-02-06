const { NotFound } = require("http-errors");
const { Contact } = require("../../models");

const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { ...data } = req.body;
    if (!data) {
      next(new NotFound(`Missing fields`));
    }

    const contact = await Contact.findByIdAndUpdate(id, data, { new: true });
    if (!contact) {
      next(new NotFound(`Product with id=${id} not found`));
    }
    res.status(200).json({
      data: {
        contact,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateContact;
