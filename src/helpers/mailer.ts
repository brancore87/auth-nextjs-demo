import nodemailer from 'nodemailer'
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'


export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // create a hashed token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10)

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(
        userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000
      }
      )
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(
        userId, {
        resetPasswordToken: hashedToken,
        resetPasswordExpires: Date.now() + 3600000
      }
      )
    }

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD,
        // TODO: Add theses credentials to .env file
      }
    })

    const mailOptions = {
      from: "brancore87@gmail.com",
      to: email,
      subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify you email" : "reset your password"}or copy and paste the link below in your browser. <br /> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
      </p>`
    }

    const mailresponse = await transporter.sendMail(mailOptions);
    return mailresponse;

  } catch (error: any) {
    throw new Error(error.message)
    
  }
}