// const { Unauthorized } = require("http-errors");

const { User } = require("../../models");

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  // if (!user) {
  //   throw new Unauthorized("Not authorized");
  // }
  res.json({
    code: 200,
    data: {
      user: {
        email,
        subscription,
      },
    },
  });
};

module.exports = getCurrent;
