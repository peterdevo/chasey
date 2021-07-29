import mongoose, { Document } from "mongoose";
import bcrypt from "bcrypt";

mongoose.Promise = global.Promise;

interface IUser extends Document {
  email: string;
  password: string;
}

const UserSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: [true, "Please enter email"],
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
  },
  image: {
    type: String,
  },
  firstName: {
    type: String,
    required: [true, "Please enter firstname"],
  },
  lastName: {
    type: String,
    required: [true, "Please enter lastname"],
  },

  phone: {
    type: String,
    required: [true, "Please enter phone number"],
  },
  address: {
    city: {
      type: String,
    },
    street: {
      type: String,
    },
    zipCode: {
      type: String,
    },
  },
  accountType: {
    type: String,
    required: [true],
  }
},{timestamps:true});

const SALT = 10;

UserSchema.pre("save", function (next) {
  let user = this;

  if (!user.isModified("password")) return next();

  bcrypt.genSalt(SALT, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const match = await bcrypt.compare(candidatePassword, this.password);
  return match;
};
export default mongoose.models.User || mongoose.model("User", UserSchema);
