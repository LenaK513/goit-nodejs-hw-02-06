const { Conflict } = require("http-errors");
const bcrypt = require("bcrypt");

const gravatar = require("gravatar");
const { joiUserSchema } = require("../../models/user");
const { User } = require("../../models");

const register = async (req, res, next) => {
  try {
    const { error } = joiUserSchema.validate(req.body);
    if (error) {
      res.status(400).json({
        message: `${error.message}`,
      });
    }

    const { email, password, subscription } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      next(new Conflict("Email in use"));
    }
    const avatarURL = gravatar.url(email);
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    await User.create({
      email,
      password: hashPassword,
      subscription,
      avatarURL,
    });
    res.status(201).json({
      data: {
        user: {
          email,
          subscription,
          avatarURL,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
