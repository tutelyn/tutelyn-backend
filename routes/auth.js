const router = require("express").Router()
const { body, validationResult } = require('express-validator')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const Teacher = require('../models/teacher/teacher')
const Student = require('../models/student/student')

const saltRounds = 10;
const secret = 'please-fuck-yourself';
const options = { expiresIn: '60d' };


router.post("/sign-up", [
    // Validate email
    body('email').isEmail().normalizeEmail().withMessage('Please enter a valid email address'),
    // Validate password
    body('password').isLength({ min: 6 }).withMessage("Please enter a password more than 6 char"),
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        return res.status(400).json({ errors: errors.array() });
    }
    try {

        console.log(req.body.email, req.body.password);
        const email = req.body.email;
        const password = req.body.password;
        const type = req.body.type;
        const userName = req.body.userName;
        if (userName == null || userName == undefined) {
            return res.json({ status: false, error: { message: "plese provide userName in the body" } });
        }

        if (type === 0) {
            let foundUser = await Student.findOne({ where: { email: email } });
            if (foundUser != null) {
                return res.json({ status: false, message: "User with this email already exists", type: "email" });
            }
            let foundUser2 = await Student.findOne({ where: { userName: userName } });

            if (foundUser2 != null) {
                return res.json({ status: false, message: "Username is already taken", type: "userName" });

            }

            else {

                try {
                    bcrypt.genSalt(saltRounds, function (err, salt) {
                        bcrypt.hash(password, salt, function (err, hash) {
                            // Store hash in database here

                            Student.create({ email: email, password: hash, userName: userName }).then((result) => {

                                console.log("student created in database");

                                const payload = {
                                    id: result.dataValues.id,
                                    email: email,
                                    userName: userName,

                                };

                                let token = jwt.sign(payload, secret, options);

                                return res.json({ status: true, message: "student account created", token: token })
                            }).catch((err) => {
                                return res.json({ status: false, error: err });
                            })
                        })
                    });

                } catch (error) {
                    console.log(error);
                    return res.json({ status: false, error: error, message: "Something went wrong!", type: "" });

                }

            }
        }

        if (type === 1) {

            let foundUser = await Teacher.findOne({ where: { email: email } });
            if (foundUser != null) {
                return res.json({ status: false, message: "User with this email already exists", type: "email" });
            }
            let foundUser2 = await Teacher.findOne({ where: { userName: userName } });

            if (foundUser2 != null) {
                return res.json({ status: false, message: "Username is already taken", type: "username" });

            }

            else {

                try {
                    bcrypt.genSalt(saltRounds, function (err, salt) {
                        bcrypt.hash(password, salt, function (err, hash) {
                            // Store hash in database here

                            Teacher.create({ email: email, password: hash, userName: userName }).then((result) => {

                                console.log("Teacher account created in database");

                                const payload = {
                                    id: result.dataValues.id,
                                    email: email,
                                    userName: userName

                                };

                                let token = jwt.sign(payload, secret, options);

                                return res.json({ status: true, message: "Teacher account created", token: token })
                            }).catch((err) => {
                                return res.json({ status: false, error: err });
                            })
                        })
                    });

                } catch (error) {
                    return res.json({ status: false, error: error, message: "Something went wrong!", type: "" });

                }






            }

        }


    } catch (error) {

        return res.json({ status: false, error: error, message: "Something went wrong!", type: "" });

    }


})

router.post("/log-in", async (req, res) => {
    try {
        console.log(req.body.email, req.body.password);
        const email = req.body.email;
        const password = req.body.password;
        const userName = req.body.userName;
        const type = req.body.type;

        if (type == 0) {



            if (email == null || email == undefined) {
                let foundUser = await Student.findOne({ where: { userName: userName } });
                if (foundUser != null) {
                    console.log(foundUser);
                    comparePassword(password, foundUser.dataValues.password)
                        .then((isMatch) => {
                            if (isMatch) {
                                let tokenData = {
                                    id: foundUser.dataValues.id,
                                    email: foundUser.dataValues.email,
                                    userName: foundUser.dataValues.userName,

                                };

                                let token = jwt.sign(tokenData, secret, options);
                                return res.json({ status: true, message: "Student login successful", token: token, email: foundUser.dataValues.email, userName: foundUser.dataValues.userName, })
                            } else {
                                return res.json({ status: false, message: "Invalid Password", type: "password" })
                            }
                        })
                        .catch((error) => {
                            return res.json({ status: false, error: error, message: "someting went wrong!" })
                        });


                }

                else {
                    return res.json({ status: false, error: "user not exist!", message: "user not exist!", type: "email" })
                }


            }

            if (userName == null || userName == undefined) {
                let foundUser = await Student.findOne({ where: { email: email } });



                if (foundUser != null) {
                    console.log(foundUser);
                    comparePassword(password, foundUser.dataValues.password)
                        .then((isMatch) => {
                            if (isMatch) {
                                let tokenData = {
                                    id: foundUser.dataValues.id,
                                    email: foundUser.dataValues.email,
                                    userName: foundUser.dataValues.userName,

                                };

                                let token = jwt.sign(tokenData, secret, options);
                                return res.json({ status: true, message: "Student login successful", token: token, email: foundUser.dataValues.email, userName: foundUser.dataValues.userName, })
                            } else {
                                return res.json({ status: false, message: "Invalid Password", type: "password" })
                            }
                        })
                        .catch((error) => {
                            return res.json({ status: false, error: error, message: "someting went wrong!" })
                        });


                }


                else {
                    return res.json({ status: false, message: "user not exist!", type: "email" })

                }

            }
        }

        if (type == 1) {
            if (email == null || email == undefined) {
                let foundUser = await Teacher.findOne({ where: { userName: userName } });
                if (foundUser != null) {
                    console.log(foundUser);
                    comparePassword(password, foundUser.dataValues.password)
                        .then((isMatch) => {
                            if (isMatch) {
                                let tokenData = {
                                    id: foundUser.dataValues.id,
                                    email: foundUser.dataValues.email,
                                    userName: foundUser.dataValues.userName,

                                };

                                let token = jwt.sign(tokenData, secret, options);
                                return res.json({ status: true, message: "Teacher login successful", token: token, email: foundUser.dataValues.email, userName: foundUser.dataValues.userName, })
                            } else {
                                return res.json({ status: false, message: "Invalid Password", type: "password" })
                            }
                        })
                        .catch((error) => {
                            return res.json({ status: false, error: error, message: "someting went wrong!" })
                        });


                }

                else {
                    return res.json({ status: false, message: "user not exist!", type: "email" })
                }


            }

            if (userName == null || userName == undefined) {
                let foundUser = await Teacher.findOne({ where: { email: email } });



                if (foundUser != null) {
                    console.log(foundUser);
                    comparePassword(password, foundUser.dataValues.password)
                        .then((isMatch) => {
                            if (isMatch) {
                                let tokenData = {
                                    id: foundUser.dataValues.id,
                                    email: foundUser.dataValues.email,
                                    userName: foundUser.dataValues.userName,

                                };

                                let token = jwt.sign(tokenData, secret, options);
                                return res.json({ status: true, message: "Teacher login successful", email: foundUser.dataValues.email, userName: foundUser.dataValues.userName, })
                            } else {
                                return res.json({ status: false, message: "Invalid Password", })
                            }
                        })
                        .catch((error) => {
                            return res.json({ status: false, error: error, message: "someting went wrong!" })
                        });


                }


                else {
                    return res.json({ status: false, message: "user not exist!", type: "email" })

                }

            }
        }
    } catch (error) {
        return res.json({ status: false, error: error, message: "Something went wrong!" })

    }




})


async function comparePassword(inputPassword, hashedPassword) {
    try {
        const match = await bcrypt.compare(inputPassword, hashedPassword);
        return match;
    } catch (error) {
        console.error('Error comparing passwords:', error);
        throw error;
    }
}






module.exports = router