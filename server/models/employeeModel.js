const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
  state: String,
  zipCode: String,
  country: String,
});
const emergencySchema = new mongoose.Schema({
  ec_name: String,
  ec_phone: String,
  ec_email: String,
});

const employeeSchema = mongoose.Schema(
  {
    personalInfo: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      dateOfBirth: {
        type: Date,
        required: true,
      },
      gender: {
        type: String,
        enum: ["male", "female", "other"],
        required: true,
        default: "male",
      },
      nationalID: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        unique: true,
      },
      phone: {
        type: Number,
        required: true,
      },
    },
    pswrd: {
      type: String,
      required: true,
    },
    photo: String,
    salary: {
      type: Number,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    address: addressSchema,
    joiningDate: Date,
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    isWaiter: {
      type: Boolean,
      required: true,
      default: false,
    },
    isCachier: {
      type: Boolean,
      required: true,
      default: false,
    },
    isKitchenManager: {
      type: Boolean,
      required: true,
      default: false,
    },
    isReceptionist: {
      type: Boolean,
      required: true,
      default: false,
    },
    emergencyContact: emergencySchema,
  },
  {
    timestamps: true,
  }
);

employeeSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.pswrd);
};
// Hash the password before saving it to the database
employeeSchema.pre("save", async function (next) {
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

const Employee = mongoose.model("employees", employeeSchema);
module.exports = Employee;
