const { Unauthorized } = require("http-errors");
const Jimp = require("jimp");
const { User } = require("../../models");

const path = require("path");
const fs = require("fs/promises");

const avatarDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res, next) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;
  const imageName = `${id}_${originalname}`;
  try {
    const resultUpload = path.join(avatarDir, imageName);
    fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("public", "avatars", imageName);
    Jimp.read(resultUpload)
      .then((imageAvatar) => {
        return imageAvatar
          .resize(250, 250)

          .write(avatarURL);
      })
      .catch((err) => {
        console.error(err);
      });
    await User.findByIdAndUpdate(req.user._id, { avatarURL });
    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(tempUpload);
    next(new Unauthorized("Not authorized"));
  }
};

module.exports = updateAvatar;
