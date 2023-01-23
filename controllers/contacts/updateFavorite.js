const { NotFound } = require("http-errors");
const { Contact } = require("../../models");

const updateFavorite = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { favorite } = req.body;
    if (!favorite) {
      next(new NotFound(`Missing fields`));
    }

    const contact = await Contact.findByIdAndUpdate(
      id,
      { favorite },
      { new: true }
    );
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

module.exports = updateFavorite;
