const { NotFound } = require("http-errors");
const { User } = require("../../models");

const updateSubscription = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { subscription } = req.body;

    if (!subscription) {
      next(new NotFound(`Missing fields`));
    }

    const user = await User.findByIdAndUpdate(
      _id,
      { subscription },
      { new: "starter" || "pro" || "business" }
    );
    if (!user) {
      next(new NotFound(`User with id=${_id} not found`));
    }
    res.status(200).json({
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateSubscription;
