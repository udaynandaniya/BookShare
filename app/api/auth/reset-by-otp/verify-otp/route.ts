// app/api/auth/reset-by-otp/verify-otp/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";

connectDB();

export async function POST(req: NextRequest) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json({ error: "Missing email or OTP" }, { status: 400 });
    }

    const user = await User.findOne({
      email,
      resetOtp: otp,
      resetOtpExpiry: { $gt: new Date() },
    });

    if (!user) {
      return NextResponse.json({ error: "OTP does not match or expired" }, { status: 400 });
    }

    return NextResponse.json({ message: "OTP verified" }); // Proceed to allow password reset
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
