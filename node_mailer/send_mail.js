require("dotenv").config()
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gamil.com",
    port: 587,
    secure: false,
    auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
    },
});

const sendEmailFunc = async (email, OTP) => {
    try {
        console.log(process.env.NODEMAILER_PASS)
        const res = await transporter.sendMail({
            from: {
                address: process.env.NODEMAILER_USER,
                name: "Shreyo Paul"
            },
            to: [email], // list of receivers
            subject: "Verify OTP", // Subject line
            text: `Here is your OTP: ${OTP}`, // plain text body
        });
        if (res) return res
        return Error("Failed!")
    } catch (error) {
        console.log(error);
    }

}


module.exports = { sendEmailFunc };
