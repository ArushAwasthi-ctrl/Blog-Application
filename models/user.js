const mongoose = require("mongoose");
const { createHmac, randomBytes } = require("crypto");

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  salt: String,
  password: {
    type: String,
    required: true,
  },
});

// 🔹 Hash password before saving
userSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  const salt = randomBytes(16).toString();
  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  user.salt = salt;
  user.password = hashedPassword;
  next();
});

//  Compare password for signin
userSchema.statics.matchPassword = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) return null;

  const hashedPassword = createHmac("sha256", user.salt)
    .update(password)
    .digest("hex");

  if (hashedPassword === user.password) {
    return user; // success ✅
  }
  return null; // wrong password
};

module.exports = mongoose.model("User", userSchema);
