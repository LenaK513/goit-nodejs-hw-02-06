const { Contact } = require("../../models");

const getAll = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const { page = 1, limit = 20 } = req.query;

    const skip = (page - 1) * limit;
    const contacts = await Contact.find(
      { owner: _id, favorite: "true" },
      "",

      {
        skip,
        limit: Number(limit),
      }
    ).populate("owner", "_id email subscription");
    res.status(200).json({
      data: {
        result: contacts,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
