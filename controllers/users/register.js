const { Conflict } = require("http-errors");
const bcrypt = require("bcrypt");

const { joiUserSchema } = require("../../models/user");
const { User } = require("../../models");

const register = async (req, res, next) => {
  try {
    const { error } = joiUserSchema.validate(req.body);
    if (error) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: "Помилка від Joi або іншої бібліотеки валідації",
      });
    }

    const { email, password, subscription } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      next(new Conflict("Email in use"));
    }

    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    await User.create({
      email,
      password: hashPassword,
      subscription,
    });
    res.status(201).json({
      code: 201,
      data: {
        user: {
          email,
          subscription,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
