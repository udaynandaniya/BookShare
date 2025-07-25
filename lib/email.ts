// // import nodemailer from "nodemailer"

// // const transporter = nodemailer.createTransport({

// //   service: "gmail",
// //   auth: {
// //     user: process.env.EMAIL_USER,
// //     pass: process.env.EMAIL_PASS,
// //   },
// // })


// // export async function sendOTPEmail(email: string, otp: string, name: string) {
// //   const mailOptions = {
// //     from: process.env.EMAIL_USER,
// //     to: email,
// //     subject: "NavneetHub - Verify Your Account",
// //     html: `
// //       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
// //         <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
// //           <h1 style="color: white; margin: 0;">NavneetHub</h1>
// //         </div>
// //         <div style="padding: 30px; background: #f9f9f9;">
// //           <h2 style="color: #333;">Hello ${name}!</h2>
// //           <p style="color: #666; font-size: 16px;">Welcome to NavneetHub! Please verify your account with the OTP below:</p>
// //           <div style="background: white; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
// //             <h1 style="color: #667eea; font-size: 32px; margin: 0; letter-spacing: 5px;">${otp}</h1>
// //           </div>
// //           <p style="color: #666;">This OTP will expire in 10 minutes.</p>
// //           <p style="color: #666;">If you didn't create an account, please ignore this email.</p>
// //         </div>
// //         <div style="background: #333; padding: 20px; text-align: center;">
// //           <p style="color: #999; margin: 0;">© 2024 NavneetHub. All rights reserved.</p>
// //         </div>
// //       </div>
// //     `,
// //   }

// //   await transporter.sendMail(mailOptions)
// // }

// // export async function sendWelcomeEmail(email: string, name: string) {
// //   const mailOptions = {
// //     from: process.env.EMAIL_USER,
// //     to: email,
// //     subject: "Welcome to NavneetHub!",
// //     html: `
// //       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
// //         <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
// //           <h1 style="color: white; margin: 0;">NavneetHub</h1>
// //         </div>
// //         <div style="padding: 30px; background: #f9f9f9;">
// //           <h2 style="color: #333;">Welcome ${name}!</h2>
// //           <p style="color: #666; font-size: 16px;">Your account has been successfully created. You can now:</p>
// //           <ul style="color: #666;">
// //             <li>Browse and buy used Navneet books</li>
// //             <li>Sell your own books to other students</li>
// //             <li>Connect with buyers and sellers in your area</li>
// //             <li>Manage your listings from your dashboard</li>
// //           </ul>
// //           <div style="text-align: center; margin: 30px 0;">
// //             <a href="${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}" style="background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">Start Exploring</a>
// //           </div>
// //           <p style="color: #666;">Happy buying and selling!</p>
// //         </div>
// //         <div style="background: #333; padding: 20px; text-align: center;">
// //           <p style="color: #999; margin: 0;">© 2024 NavneetHub. All rights reserved.</p>
// //         </div>
// //       </div>
// //     `,
// //   }

// //   await transporter.sendMail(mailOptions)
// // }

// // export async function sendPasswordResetEmail(email: string, resetToken: string, name: string) {
// //   const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/reset-password?token=${resetToken}`

// //   const mailOptions = {
// //     from: process.env.EMAIL_USER,
// //     to: email,
// //     subject: "NavneetHub - Reset Your Password",
// //     html: `
// //       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
// //         <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
// //           <h1 style="color: white; margin: 0;">NavneetHub</h1>
// //         </div>
// //         <div style="padding: 30px; background: #f9f9f9;">
// //           <h2 style="color: #333;">Hello ${name}!</h2>
// //           <p style="color: #666; font-size: 16px;">You requested to reset your password. Click the button below to create a new password:</p>
// //           <div style="text-align: center; margin: 30px 0;">
// //             <a href="${resetUrl}" style="background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a>
// //           </div>
// //           <p style="color: #666;">This link will expire in 1 hour.</p>
// //           <p style="color: #666;">If you didn't request this, please ignore this email.</p>
// //         </div>
// //         <div style="background: #333; padding: 20px; text-align: center;">
// //           <p style="color: #999; margin: 0;">© 2024 NavneetHub. All rights reserved.</p>
// //         </div>
// //       </div>
// //     `,
// //   }

// //   await transporter.sendMail(mailOptions)
// // }
// import nodemailer from "nodemailer"

// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: Number(process.env.SMTP_PORT),
//   secure: false, // true for port 465, false for 587
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS,
//   },
// })

// const FROM = `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`

// export async function sendOTPEmail(email: string, otp: string, name: string) {
//   const mailOptions = {
//     from: FROM,
//     to: email,
//     subject: "Verify your account - NavneetHub",
//     text: `Hello ${name},\n\nYour OTP is: ${otp}\nIt will expire in 10 minutes.\n\nIf you didn't request this, please ignore.\n\n- NavneetHub`,
//     html: `
//       <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
//         <h2>Hello ${name},</h2>
//         <p>Your OTP is:</p>
//         <div style="font-size: 24px; font-weight: bold; padding: 10px 20px; background: #f0f0f0; width: fit-content; border-radius: 4px;">${otp}</div>
//         <p style="margin-top: 20px;">It expires in 10 minutes.</p>
//         <p>If you didn’t request this, please ignore the email.</p>
//         <p style="color: #999; font-size: 12px;">© 2024 NavneetHub</p>
//       </div>
//     `,
//   }

//   await transporter.sendMail(mailOptions)
// }

// export async function sendWelcomeEmail(email: string, name: string) {
//   const mailOptions = {
//     from: FROM,
//     to: email,
//     subject: "Welcome to NavneetHub!",
//     text: `Hi ${name},\n\nWelcome to NavneetHub! You can now buy, sell, and manage your books easily.\n\n- Team NavneetHub`,
//     html: `
//       <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
//         <h2>Welcome ${name}!</h2>
//         <p>You can now:</p>
//         <ul>
//           <li>Browse & buy used Navneet books</li>
//           <li>Sell your own books</li>
//           <li>Manage listings on your dashboard</li>
//         </ul>
//         <a href="${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}" style="background: #4f46e5; color: white; padding: 10px 20px; border-radius: 4px; text-decoration: none;">Start Exploring</a>
//         <p style="color: #999; font-size: 12px; margin-top: 20px;">© 2024 NavneetHub</p>
//       </div>
//     `,
//   }

//   await transporter.sendMail(mailOptions)
// }

// export async function sendPasswordResetEmail(email: string, resetToken: string, name: string) {
//   const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/reset-password?token=${resetToken}`

//   const mailOptions = {
//     from: FROM,
//     to: email,
//     subject: "Reset your password - NavneetHub",
//     text: `Hi ${name},\n\nClick the link below to reset your password:\n${resetUrl}\n\nThis link will expire in 1 hour.\n\n- NavneetHub`,
//     html: `
//       <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
//         <h2>Hello ${name},</h2>
//         <p>You requested to reset your password. Click below to proceed:</p>
//         <a href="${resetUrl}" style="background: #4f46e5; color: white; padding: 10px 20px; border-radius: 4px; text-decoration: none;">Reset Password</a>
//         <p>This link will expire in 1 hour.</p>
//         <p>If you didn't request this, please ignore it.</p>
//         <p style="color: #999; font-size: 12px;">© 2024 NavneetHub</p>
//       </div>
//     `,
//   }

//   await transporter.sendMail(mailOptions)
// }

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
