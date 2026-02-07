
//C:\Users\UDAYN\Downloads\navneethub\lib\email.ts
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER!,
    pass: process.env.EMAIL_PASS!, // Gmail App Password
  },
});

const FROM = `"NavneetHub" <${process.env.EMAIL_USER}>`;

export async function sendOTPEmail(email: string, otp: string, name: string) {
  await transporter.sendMail({
    from: FROM,
    to: email,
    subject: "NavneetHub – Your OTP Code",
    text: `Hello ${name}, your OTP is ${otp}. It expires in 10 minutes.`,
    html: `
      <div style="font-family: sans-serif; max-width:600px;">
        <h2>Hello ${name},</h2>
        <p>Your OTP is:</p>
        <div style="margin:20px;padding:10px;background:#eee;font-size:18px;text-align:center;">
          <strong>${otp}</strong>
        </div>
        <p>Expires in 10 minutes.</p>
        <hr/>
        <footer style="font-size:12px;color:#888;">
          © ${new Date().getFullYear()} NavneetHub
        </footer>
      </div>
    `,
  });
}

export async function sendDeletionNotificationEmail(email: string, name: string, bookTitle: string, reason: string) {
  await transporter.sendMail({
    from: FROM,
    to: email,
    subject: "NavneetHub – Book Post Removed",
    text: `Hello ${name}, your book post "${bookTitle}" has been removed. Reason: ${reason}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 10px; overflow: hidden;">
        <div style="background: rgba(255,255,255,0.1); padding: 20px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px;">📚 NavneetHub</h1>
        </div>
        
        <div style="padding: 30px;">
          <h2 style="color: #ffeb3b; margin-bottom: 20px;">Book Post Removed</h2>
          
          <p style="font-size: 16px; line-height: 1.6;">Hello <strong>${name}</strong>,</p>
          
          <p style="font-size: 16px; line-height: 1.6;">
            We're writing to inform you that your book post has been removed from NavneetHub.
          </p>
          
          <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin: 0 0 10px 0; color: #ffeb3b;">Book Details:</h3>
            <p style="margin: 0; font-size: 18px; font-weight: bold;">"${bookTitle}"</p>
          </div>
          
          <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin: 0 0 10px 0; color: #ffeb3b;">Reason for Removal:</h3>
            <p style="margin: 0; font-size: 16px; line-height: 1.6;">${reason}</p>
          </div>
          
          <p style="font-size: 14px; line-height: 1.6; color: #e1bee7;">
            If you believe this was done in error or have questions, please contact our support team.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL || "https://navneethub.com"}" 
               style="background: #4caf50; color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">
              Visit NavneetHub
            </a>
          </div>
        </div>
        
        <div style="background: rgba(0,0,0,0.2); padding: 20px; text-align: center; font-size: 12px; color: #e1bee7;">
          <p style="margin: 0;">© ${new Date().getFullYear()} NavneetHub - Connecting Students Through Books</p>
          <p style="margin: 5px 0 0 0;">This is an automated message, please do not reply to this email.</p>
        </div>
      </div>
    `,
  })
}
