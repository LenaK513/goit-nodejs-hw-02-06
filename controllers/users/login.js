const { Unauthorized } = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { joiUserSchema } = require("../../models/user");
const { User } = require("../../models");

const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  try {
    const { error } = joiUserSchema.validate(req.body);
    if (error) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: "Помилка від Joi або іншої бібліотеки валідації",
      });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      next(new Unauthorized(`Email ${email} is wrong`));
    }
    const passwordCompare = bcrypt.compareSync(password, user.password);
    if (!passwordCompare) {
      next(new Unauthorized(`Password ${password} is wrong`));
    }
    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    await User.findByIdAndUpdate(user._id, { token });

    res.json({
      code: 200,
      data: {
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
