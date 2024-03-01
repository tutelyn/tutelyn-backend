const router = require("express").Router()
const bcrypt = require("bcrypt")

const saltRounds = 10;
const secret = 'please-fuck-yourself';
const options = { expiresIn: '60d' };

const Student = require("../models/student/student");
const Teacher = require("../models/teacher/teacher");
const { sendEmailFunc } = require("../node_mailer/send_mail");


const otpGenerator = (length) => {
    otp = Math.floor(Math.random() * 9) + 1;
    for (let i = 1; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * 10);
        otp = otp * 10 + randomIndex;
    }
    return otp
}

router.post("/request-otp", async (req, res) => {

    try {
        const email = req.body.email;
        const type = req.body.type;
        if (email == null || email == undefined) {
            return res.json({ status: false, error: { message: "Please provide email in the body" } });
        }
        OTP = otpGenerator(6)
        console.log(OTP)

        const user = type === 0 ? await Student.findOne({ where: { email } }) : await Teacher.findOne({ where: { email } })

        if (user) {
            user.OTP = OTP;
            await user.save();

            const sent = await sendEmailFunc(email, OTP)
            if (sent) return res.json({ status: true, message: "OTP sent!", otp: OTP });
            else return res.json({ status: false, message: "OTP not sent!" });
        } else {
            res.json({ status: false, errorType: "email", message: "User does not exist!" });
        }


    } catch (error) {
        console.log(error)
        return res.json({ status: false, message: error });
    }
})

router.post("/check-otp", async (req, res) => {

    try {
        const email = req.body.email;
        const type = req.body.type;
        const otp = req.body.otp;

        if (email == null || email == undefined) {
            return res.json({ status: false, error: { message: "Please provide email in the body" } });
        }

        const user = type === 0 ? await Student.findOne({ where: { email } }) : await Teacher.findOne({ where: { email } })

        if (otp === user.OTP) {
            return res.json({ status: true, message: "Verification successful!" });
        } else {
            return res.json({ status: false,  errorType:"otp", message: "Wrong OTP!" });
        }


    } catch (error) {
        console.log(error)
        return res.json({ status: false, message: error });
    }
})

router.post("/reset-password", async (req, res) => {
    try {
        const email = req.body.email;
        const type = req.body.type;
        const password = req.body.password;

        if (email == null || email == undefined) {
            return res.json({ status: false, error: { message: "Please provide email in the body" } });
        }

        const user = type === 0 ? await Student.findOne({ where: { email } }) : await Teacher.findOne({ where: { email } })

        if (user) {
            bcrypt.genSalt(saltRounds, function (err, salt) {
                bcrypt.hash(password, salt, async function (err, hash) {
                    user.password = hash
                    await user.save()
                    return res.json({ status: true, message: "Password changed!" });
                })
            })
        } else {
            return res.json({ status: false, errorType: "email", message: "User does not exist!" });
        }


    } catch (error) {
        console.log(error)
        return res.json({ status: false, errorType: "somehing", message: error });
    }
})

module.exports = router