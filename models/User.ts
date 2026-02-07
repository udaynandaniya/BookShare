

import mongoose from "mongoose"
const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    mobile: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: {
        validator: (v: string) => /^[0-9]{10}$/.test(v),
        message: "Mobile number must be exactly 10 digits",
      },
    },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },

    // ✅ FOR SIGNUP FLOW
    emailOtp: { type: String },
    emailOtpExpiry: { type: Date },

    // ✅ FOR PASSWORD RESET FLOW
    resetOtp: { type: String },
    resetOtpExpiry: { type: Date },
  },
  { timestamps: true }
);
export const User = mongoose.models.User || mongoose.model("User", userSchema)

