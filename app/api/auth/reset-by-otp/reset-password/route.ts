// app/api/auth/reset-by-otp/reset-password/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";

connectDB();

export async function POST(req: NextRequest) {
  try {
    const { email, otp, newPassword } = await req.json();

    if (!email || !otp || !newPassword) {
      return NextResponse.json({ error: "All fields required" }, { status: 400 });
    }

    const user = await User.findOne({
      email,
      resetOtp: otp,
      resetOtpExpiry: { $gt: new Date() },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    user.resetOtp = undefined;
    user.resetOtpExpiry = undefined;

    await user.save();

    return NextResponse.json({ message: "Password reset successfully. Please login." });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
