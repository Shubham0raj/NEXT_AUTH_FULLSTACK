import User from "@/models/userModels";
import nodemailer from "nodemailer"
import bcryptjs from "bcryptjs";
export const sendEmail = async({email,emailType,userId}:any)=>{
    try {

        const hashedToken = await bcryptjs.hash(userId.toString(),10)
        if(emailType==="VERIFY"){
          await User.findByIdAndUpdate(userId,{$set:{verifyToken:hashedToken,verifyTokenExpiry :Date.now()+3600000}})
        }else if(emailType=== "RESET"){
            await User.findByIdAndUpdate(userId,{$set:{
                forgotPasswordToken:hashedToken,forgotPasswordTokenExpiry:Date.now()+3600000
            }})
        }
        
        var transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD,
        },
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: emailType==='VERIFY' ? "Verify your email":"Reset your password",
            text: "Hello world?",
            html: `<p>Click <a href = "${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType==="VERIFY" ? "Verify your email":"reset your password"}or copy and paste the link below in the brouser.<br>
            ${process.env.DOMAIN}/verifyemail?token=${hashedToken}`
        }

        const mailResponse = await transporter.sendMail(mailOptions);

        return mailResponse
    } catch (error:any) {
        throw new Error(error.message)
    }
}