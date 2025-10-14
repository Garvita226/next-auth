import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import User from "@/models/user.model";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 36000000,
        },
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 36000000,
        },
      });
    }

    var transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "55ae849eaa9605",
        pass: "5f60c1d9b218e5",
      },
    });

    const mailOptions = {
      from: "garvita@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href=${process.env.DOMAIN}/verifyemail?token=${hashedToken}>here</a> to ${emailType === 'VERIFY' ? "verify your email" : "reset your password"} or copy and paste the link below in your browser <br>${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`,
    };

    const mailResponse = await transporter.sendMail(mailOptions);

    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
