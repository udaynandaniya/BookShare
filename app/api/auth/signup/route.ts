// // // //C:\Users\UDAYN\Downloads\navneethub\app\api\auth\signup\route.ts


// // // import { NextRequest, NextResponse } from "next/server"
// // // import bcrypt from "bcryptjs"
// // // import { connectDB } from "@/lib/mongodb"
// // // import { User } from "@/models/User"
// // // import { sendOTPEmail } from "@/lib/email"
// // // import { MongoServerError } from "mongodb" 

// // // export async function POST(req: NextRequest) {
// // //   await connectDB()
// // //   const { fullName, mobile, email, password } = await req.json()

// // //   if (!fullName || !mobile || !email || !password)
// // //     return NextResponse.json({ message: "All fields are required" }, { status:400 })





// // //   if (!email.endsWith("@gmail.com"))
// // //     return NextResponse.json({ message: "Email must be Gmail" }, { status:400 })

// // //   if (!/^[6-9]\d{9}$/.test(mobile))
// // //     return NextResponse.json({ message: "Invalid mobile number" }, { status:400 })

// // //   const existing = await User.findOne({ email, isVerified: true })
// // //   if (existing)
// // //     return NextResponse.json({ message: "User is already registered & verified Please Login" }, { status:400 })

// // //   let user = await User.findOne({ email })
// // //   const hashed = await bcrypt.hash(password,12)
// // //   const otp = Math.floor(100000 + Math.random()*900000).toString()
// // //   const expiry = new Date(Date.now() + 10*60*1000)

// // //   if (user) {
// // //     // Reuse unverified user
// // //     user.fullName = fullName
// // //     user.mobile = mobile
// // //     user.password = hashed
// // //     user.otp = otp
// // //     user.otpExpiry = expiry
// // //   } else {
// // //     user = new User({ fullName, mobile, email, password:hashed, otp, otpExpiry:expiry })
// // //   }
// // // const isAdmin = email === process.env.ADMIN_EMAIL;
// // // user.isAdmin = isAdmin;

// // //   try {
// // //     await user.save()
// // //   } catch (err: any) {
// // //     if (err instanceof MongoServerError && err.code === 11000) {
// // //       const duplicateField = Object.keys(err.keyPattern)[0]
// // //       const message = duplicateField === "mobile"
// // //         ? "Mobile number already registered. Please login or use a different number."
// // //         : "Email already registered. Please login or use a different email."

// // //       return NextResponse.json({ message }, { status: 400 })
// // //     }

// // //     return NextResponse.json({ message: "Failed to create user." }, { status: 500 })
// // //   }

// // //   await sendOTPEmail(email, otp, fullName)

// // //   return NextResponse.json({ message: "OTP sent. Check email." }, { status: 201 })
// // // }

// // import { type NextRequest, NextResponse } from "next/server"
// // import bcrypt from "bcryptjs"
// // import { connectDB } from "@/lib/mongodb"
// // import { User } from "@/models/User"
// // import { sendOTPEmail } from "@/lib/email"
// // import { MongoServerError } from "mongodb"

// // export async function POST(req: NextRequest) {
// //   await connectDB()
// //   const { fullName, mobile, email, password } = await req.json()

// //   if (!fullName || !mobile || !email || !password)
// //     return NextResponse.json({ message: "All fields are required" }, { status: 400 })

// //   if (!email.endsWith("@gmail.com")) return NextResponse.json({ message: "Email must be Gmail" }, { status: 400 })

// //   if (!/^[6-9]\d{9}$/.test(mobile)) return NextResponse.json({ message: "Invalid mobile number" }, { status: 400 })

// //   // Check for verified users first
// //   const verifiedUserWithEmail = await User.findOne({ email, isVerified: true })
// //   if (verifiedUserWithEmail)
// //     return NextResponse.json({ message: "User is already registered & verified. Please Login" }, { status: 400 })

// //   const verifiedUserWithMobile = await User.findOne({ mobile, isVerified: true })
// //   if (verifiedUserWithMobile)
// //     return NextResponse.json(
// //       { message: "Mobile number is already registered & verified. Please Login" },
// //       { status: 400 },
// //     )

// //   // Check for unverified users and handle them
// //   const unverifiedUserWithEmail = await User.findOne({ email, isVerified: false })
// //   const unverifiedUserWithMobile = await User.findOne({ mobile, isVerified: false })

// //   // If there's an unverified user with different mobile/email, delete them first
// //   if (unverifiedUserWithEmail && unverifiedUserWithEmail.mobile !== mobile) {
// //     await User.deleteOne({ _id: unverifiedUserWithEmail._id })
// //   }
// //   if (unverifiedUserWithMobile && unverifiedUserWithMobile.email !== email) {
// //     await User.deleteOne({ _id: unverifiedUserWithMobile._id })
// //   }

// //   const hashed = await bcrypt.hash(password, 12)
// //   const otp = Math.floor(100000 + Math.random() * 900000).toString()
// //   const expiry = new Date(Date.now() + 10 * 60 * 1000)
// //   const isAdmin = email === process.env.ADMIN_EMAIL

// //   let user = await User.findOne({ email, isVerified: false })

// //   if (user) {
// //     // Update existing unverified user
// //     user.fullName = fullName
// //     user.mobile = mobile
// //     user.password = hashed
// //     user.otp = otp
// //     user.otpExpiry = expiry
// //     user.isAdmin = isAdmin
// //   } else {
// //     // Create new user
// //     user = new User({
// //       fullName,
// //       mobile,
// //       email,
// //       password: hashed,
// //       otp,
// //       otpExpiry: expiry,
// //       isAdmin,
// //       isVerified: false,
// //     })
// //   }

// //   try {
// //     await user.save()
// //   } catch (err: any) {
// //     if (err instanceof MongoServerError && err.code === 11000) {
// //       // Handle duplicate key error - this shouldn't happen now, but just in case
// //       const duplicateField = Object.keys(err.keyPattern)[0]

// //       if (duplicateField === "mobile") {
// //         // Try to find and delete the conflicting unverified user
// //         await User.deleteOne({ mobile, isVerified: false })
// //         // Try to save again
// //         try {
// //           await user.save()
// //         } catch (retryErr) {
// //           return NextResponse.json(
// //             {
// //               message: "Mobile number conflict. Please try again or contact support.",
// //             },
// //             { status: 400 },
// //           )
// //         }
// //       } else if (duplicateField === "email") {
// //         // Try to find and delete the conflicting unverified user
// //         await User.deleteOne({ email, isVerified: false })
// //         // Try to save again
// //         try {
// //           await user.save()
// //         } catch (retryErr) {
// //           return NextResponse.json(
// //             {
// //               message: "Email conflict. Please try again or contact support.",
// //             },
// //             { status: 400 },
// //           )
// //         }
// //       } else {
// //         return NextResponse.json(
// //           {
// //             message: "Registration conflict. Please try again.",
// //           },
// //           { status: 400 },
// //         )
// //       }
// //     } else {
// //       console.error("User creation error:", err)
// //       return NextResponse.json({ message: "Failed to create user." }, { status: 500 })
// //     }
// //   }

// //   try {
// //     await sendOTPEmail(email, otp, fullName)
// //     return NextResponse.json({ message: "OTP sent. Check email." }, { status: 201 })
// //   } catch (emailError) {
// //     console.error("Email sending failed:", emailError)
// //     // Delete the user if email fails
// //     await User.deleteOne({ _id: user._id })
// //     return NextResponse.json(
// //       {
// //         message: "Failed to send OTP email. Please try again.",
// //       },
// //       { status: 500 },
// //     )
// //   }
// // }




// //C:\Users\UDAYN\Downloads\navneethub\app\api\auth\signup\route.ts
// import { type NextRequest, NextResponse } from "next/server"
// import bcrypt from "bcryptjs"
// import { connectDB } from "@/lib/mongodb"
// import { User } from "@/models/User"
// import { sendOTPEmail } from "@/lib/email"

// export async function POST(req: NextRequest) {
//   await connectDB()
//   const { fullName, mobile, email, password } = await req.json()

//   if (!fullName || !mobile || !email || !password)
//     return NextResponse.json({ message: "All fields are required" }, { status: 400 })

//   if (!email.endsWith("@gmail.com")) return NextResponse.json({ message: "Email must be Gmail" }, { status: 400 })

//   if (!/^[6-9]\d{9}$/.test(mobile)) return NextResponse.json({ message: "Invalid mobile number" }, { status: 400 })

//   // Check for verified users first - FIXED LOGIC
//   const verifiedUserWithEmail = await User.findOne({ email, isVerified: true })
//   if (verifiedUserWithEmail) {
//     return NextResponse.json({ message: "Email is already registered & verified. Please Login" }, { status: 400 })
//   }

//   const verifiedUserWithMobile = await User.findOne({ mobile, isVerified: true })
//   if (verifiedUserWithMobile) {
//     return NextResponse.json(
//       { message: "Mobile number is already registered & verified. Please Login" },
//       { status: 400 },
//     )
//   }

//   // Handle unverified users - DELETE them if they exist
//   await User.deleteMany({
//     $or: [
//       { email, isVerified: false },
//       { mobile, isVerified: false },
//     ],
//   })

//   const hashed = await bcrypt.hash(password, 12)
//   const otp = Math.floor(100000 + Math.random() * 900000).toString()
//   const expiry = new Date(Date.now() + 10 * 60 * 1000)
//   const isAdmin = email === process.env.ADMIN_EMAIL

//   // Always create a fresh user (since we deleted any unverified ones above)
//   const user = new User({
//     fullName,
//     mobile,
//     email,
//     password: hashed,
//     otp,
//     otpExpiry: expiry,
//     isAdmin,
//     isVerified: false,
//   })

//   try {
//     await user.save()
//   } catch (err: any) {
//     console.error("User creation error:", err)
//     return NextResponse.json({ message: "Failed to create user. Please try again." }, { status: 500 })
//   }

//   try {
//     await sendOTPEmail(email, otp, fullName)
//     return NextResponse.json({ message: "OTP sent. Check email." }, { status: 201 })
//   } catch (emailError) {
//     console.error("Email sending failed:", emailError)
//     // Delete the user if email fails
//     await User.deleteOne({ _id: user._id })
//     return NextResponse.json(
//       {
//         message: "Failed to send OTP email. Please try again.",
//       },
//       { status: 500 },
//     )
//   }
// }


// C:\Users\UDAYN\Downloads\navneethub\app\api\auth\signup\route.ts
import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { connectDB } from "@/lib/mongodb"
import { User } from "@/models/User"
import { sendOTPEmail } from "@/lib/email"

export async function POST(req: NextRequest) {
  await connectDB()
  const { fullName, mobile, email, password } = await req.json()

  if (!fullName || !mobile || !email || !password)
    return NextResponse.json({ message: "All fields are required" }, { status: 400 })

  if (!email.endsWith("@gmail.com")) return NextResponse.json({ message: "Email must be Gmail" }, { status: 400 })

  if (!/^[6-9]\d{9}$/.test(mobile)) return NextResponse.json({ message: "Invalid mobile number" }, { status: 400 })

  // Check for verified users first
  const verifiedUserWithEmail = await User.findOne({ email, isVerified: true })
  if (verifiedUserWithEmail) {
    return NextResponse.json({ message: "Email is already registered & verified. Please Login" }, { status: 400 })
  }

  const verifiedUserWithMobile = await User.findOne({ mobile, isVerified: true })
  if (verifiedUserWithMobile) {
    return NextResponse.json(
      { message: "Mobile number is already registered & verified. Please Login" },
      { status: 400 },
    )
  }

  // Delete unverified users with same email/mobile
  await User.deleteMany({
    $or: [
      { email, isVerified: false },
      { mobile, isVerified: false },
    ],
  })

  const hashed = await bcrypt.hash(password, 12)
  const otp = Math.floor(100000 + Math.random() * 900000).toString()
  const expiry = new Date(Date.now() + 10 * 60 * 1000)
  const isAdmin = email === process.env.ADMIN_EMAIL

  const user = new User({
    fullName,
    mobile,
    email,
    password: hashed,
    emailOtp: otp,
    emailOtpExpiry: expiry,
    isAdmin,
    isVerified: false,
  })

  try {
    await user.save()
  } catch (err: any) {
    console.error("User creation error:", err)
    return NextResponse.json({ message: "Failed to create user. Please try again." }, { status: 500 })
  }

  try {
    await sendOTPEmail(email, otp, fullName)
    return NextResponse.json({ message: "OTP sent. Check email." }, { status: 201 })
  } catch (emailError) {
    console.error("Email sending failed:", emailError)
    await User.deleteOne({ _id: user._id })
    return NextResponse.json(
      {
        message: "Failed to send OTP email. Please try again.",
      },
      { status: 500 },
    )
  }
}
