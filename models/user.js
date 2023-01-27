const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const userSchema = Schema({
  password: {
    type: String,
    required: [true, "Set password for user"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: String,
});

userSchema.pre("save", async function (next) {
  try {
    const user = this;
    if (!user.isModified("password")) next();
    const hashPassword = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
    this.password = hashPassword;
    next();
  } catch (error) {
    return next(error);
  }
});
userSchema.methods.matchPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

const joiUserSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().required(),
  subscription: Joi.string(),
});

const User = model("user", userSchema);

module.exports = {
  User,
  joiUserSchema,
};
