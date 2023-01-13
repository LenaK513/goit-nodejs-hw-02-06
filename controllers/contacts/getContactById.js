const { NotFound } = require("http-errors");

const { Contact } = require("../../models");

const getContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    if (!contact) {
      next(new NotFound(`Contact with id=${id} not found`));
    }
    res.json({ status: "success", code: 200, data: { contact } });
  } catch (error) {
    next(error);
  }
};

module.exports = getContactById;
