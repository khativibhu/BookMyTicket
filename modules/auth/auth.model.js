import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name: {type: String,
     required:[true, "name is required"],
     trim: true,
     minlength: 2,
     maxlength: 50,
    },
    email: {type: String,
      required:[true, "email is required"],
      unique: true,
      lowercase: true,
    },
    password: {type: String,
      required:[true, "password is required"],  
      minlength: 8,
      select: false,
    },

    isVerified: {type: Boolean, default:false},

    verificationToken: {type: String, select:false},
    refreshToken: {type: String, select:false},
},{timestamps: true});


// Hash password before saving
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};


export default mongoose.model("User",userSchema);

