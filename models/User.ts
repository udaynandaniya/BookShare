// // // // C:\Users\UDAYN\Downloads\navneethub\models\User.ts

// // // import mongoose from "mongoose"
// // // import bcrypt from "bcryptjs"

// // // const userSchema = new mongoose.Schema(
// // //   {
// // //     fullName: {
// // //       type: String,
// // //       required: true,
// // //       trim: true,
// // //     },
// // //     email: {
// // //       type: String,
// // //       required: true,
// // //       unique: true,
// // //       lowercase: true,
// // //       trim: true,
// // //     },
// // //     mobile: {
// // //       type: String,
// // //       required: true,
// // //       unique: true,
// // //       match: /^[6-9]\d{9}$/,
// // //     },
// // //     password: {
// // //       type: String,
// // //       required: true,
// // //       minlength: 6,
// // //     },
   
// // //     whatsappNumber: {
// // //       type: String,
// // //       match: /^[6-9]\d{9}$/,
// // //     },
// // //     isVerified: {
// // //       type: Boolean,
// // //       default: false,
// // //     },
// // //     isAdmin: {
// // //     type: Boolean,
// // //     default: false,
// // //    },

// // //     otp: {
// // //       type: String,
// // //     },
// // //     otpExpiry: {
// // //       type: Date,
// // //     },
// // //   },
// // //   {
// // //     timestamps: true,
// // //   },
// // // )

// // // export const User = mongoose.models.User || mongoose.model("User", userSchema);



// // import mongoose from "mongoose"

// // const userSchema = new mongoose.Schema(
// //   {
// //     fullName: {
// //       type: String,
// //       required: true,
// //       trim: true,
// //     },
// //     email: {
// //       type: String,
// //       required: true,
// //       unique: true,
// //       lowercase: true,
// //       trim: true,
// //     },
// //     mobile: {
// //       type: String,
// //       required: true,
// //       unique: true,
// //       trim: true,
// //       validate: {
// //         validator: (v: string) => /^[0-9]{10}$/.test(v),
// //         message: "Mobile number must be exactly 10 digits",
// //       },
// //     },
    
// //     password: {
// //       type: String,
// //       required: true,
// //     },
// //     isVerified: {
// //       type: Boolean,
// //       default: false,
// //     },
// //     isAdmin: {
// //       type: Boolean,
// //       default: false,
// //     },
// //     otp: {
// //       type: String,
// //     },
// //     otpExpiry: {
// //       type: Date,
// //     },
// //   },
// //   {
// //     timestamps: true,
// //   },
// // )

// // // Create indexes for better performance
// // userSchema.index({ email: 1 })
// // userSchema.index({ mobile: 1 })

// // export const User = mongoose.models.User || mongoose.model("User", userSchema)



// //C:\Users\UDAYN\Downloads\navneethub\models\User.ts
// import mongoose from "mongoose"

// const userSchema = new mongoose.Schema(
//   {
//     fullName: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//       trim: true,
//     },
//     mobile: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true,
//       validate: {
//         validator: (v: string) => /^[0-9]{10}$/.test(v),
//         message: "Mobile number must be exactly 10 digits",
//       },
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     isVerified: {
//       type: Boolean,
//       default: false,
//     },
//     isAdmin: {
//       type: Boolean,
//       default: false,
//     },
//     otp: {
//       type: String,
//     },
//     otpExpiry: {
//       type: Date,
//     },
//   },
//   {
//     timestamps: true,
//   },
// )

// export const User = mongoose.models.User || mongoose.model("User", userSchema)


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

