import { NextResponse } from "next/server";
import { connectDB as connect } from "@/dbconfig/dbconfig";
import User from "@/models/user.model";
import jwt from "jsonwebtoken";
import { sendResetPasswordEmail } from "@/helpers/mailerresetpassword";

connect();

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // generate reset token
    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET!, {
      expiresIn: "1h",
    });

    const resetLink = `${process.env.DOMAIN}/reset-password/${token}`;

    // send email
    await sendResetPasswordEmail(email, resetLink);

    return NextResponse.json(
      { message: "Reset link sent to your email", resetUrl: resetLink },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Forgot Password Error:", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
