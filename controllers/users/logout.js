const { Unauthorized } = require("http-errors");

const { User } = require("../../models");

const logout = async (req, res) => {
  const { _id, user } = req.user;

  if (!user) {
    throw new Unauthorized("Not authorized");
  }
  await User.findByIdAndUpdate(_id, { token: null });
  res.status(204).json();
};

module.exports = logout;
