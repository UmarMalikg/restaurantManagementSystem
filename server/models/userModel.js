const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phNo: {
      type: Number,
      required: true,
    },
    pswrd: {
      type: String,
      required: true,
    },
    dOB: {
      type: Date,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female", "other"],
      default: "male",
    },
    nationalId: {
      type: Number,
      required: true,
      unique: true,
    },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: Number,
      country: String,
      addressDesc: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.pswrd);
};
// Hash the password before saving it to the database
userSchema.pre("save", async function (next) {
  try {
    // Hash the password only if it has been modified or is new
    if (!this.isModified("pswrd")) {
      return next();
    }

    // Generate a salt
    const salt = await bcrypt.genSalt(SALT_ROUNDS);

    // Hash the password along with the new salt
    const hashedPassword = await bcrypt.hash(this.pswrd, salt);

    // Replace the plaintext password with the hashed password
    this.pswrd = hashedPassword;

    return next();
  } catch (error) {
    return next(error);
  }
});

const User = mongoose.model("users", userSchema);
module.exports = User;
