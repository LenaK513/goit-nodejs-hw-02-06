const { NotFound } = require("http-errors");

const { Contact } = require("../../models");

const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;

    const contactToDelete = await Contact.findByIdAndRemove(id);
    if (!contactToDelete) {
      throw new NotFound(`Contact with id=${id} not found`);
    }
    res.status(200).json({
      message: "contact deleted",
      data: { contactToDelete },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteContact;
