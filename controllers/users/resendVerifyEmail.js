const { BadRequest } = require("http-errors");

const { User, joiUserVerifySchema } = require("../../models");
const { sendEmail } = require("../../helpers");

const resendVerifyEmail = async (req, res, next) => {
  try {
    const { error } = joiUserVerifySchema.validate(req.body);
    if (error) {
      res.status(400).json({
        message: `${error.message}`,
      });
    }
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      next(new BadRequest("Missing required field email"));
    }

    if (user.verify) {
      next(new BadRequest("Verification has already been passed"));
    }
    const mail = {
      to: email,
      subject: "Confirmation of email",
      html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${user.verificationToken}">Confirm email</a>`,
    };
    await sendEmail(mail);
    return res.status(200).json({
      message: "Verification email sent",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = resendVerifyEmail;
