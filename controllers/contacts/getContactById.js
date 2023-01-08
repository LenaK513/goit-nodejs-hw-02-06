const { NotFound } = require("http-errors");

const contactsOperations = require("../../models/index");

const getContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await contactsOperations.getContactById(id);
    if (!contact) {
      throw new NotFound(`Contact with id=${id} not found`);
    }
    res.json({ status: "success", code: 200, data: { contact } });
  } catch (error) {
    next(error);
  }
};

module.exports = getContactById;
