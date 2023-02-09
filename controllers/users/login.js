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
        message: `${error.message}`,
      });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      next(new Unauthorized("Email or password is wrong"));
    }
    const passwordCompare = bcrypt.compareSync(password, user.password);
    if (!passwordCompare) {
      next(new Unauthorized("Email or password is wrong"));
    }

    if (!user.verify) {
      next(new Unauthorized("Email not verify"));
    }

    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    await User.findByIdAndUpdate(user._id, { token });

    res.status(200).json({
      data: {
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
