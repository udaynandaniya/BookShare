// app/api/auth/reset-by-otp/send-otp/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { sendOTPEmail } from "@/lib/email";

connectDB();

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) return NextResponse.json({ error: "Email is required" }, { status: 400 });

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "Please enter registered email" }, { status: 404 });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

    user.resetOtp = otp;
    user.resetOtpExpiry = expiry;
    await user.save();

    await sendOTPEmail(user.email, otp, user.fullName);

    return NextResponse.json({ message: "OTP sent successfully" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
