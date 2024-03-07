const router = require("express").Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Teacher = require('../models/teacher/teacher');
const Student = require('../models/student/student');
const saltRounds = 10;
const secret = 'please-fuck-yourself';
const options = { expiresIn: '60d' };

router.post("/sign-up", [
    // Validate email
    body('email').isEmail().normalizeEmail().withMessage('Please enter a valid email address'),
    // Validate password
    body('password').isLength({ min: 6 }).withMessage("Please enter a password more than 6 characters"),
], signUpHandler);

router.post("/log-in", logInHandler);

async function signUpHandler(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { email, password, type, userName } = req.body;

        if (!userName) {
            return res.json({ status: false, error: { message: "Please provide a username in the request body" } });
        }

        let User;
        if (type === 0) {
            User = Student;
        } else if (type === 1) {
            User = Teacher;
        }

        const foundUserByEmail = await User.findOne({ where: { email } });
        if (foundUserByEmail) {
            return res.json({ status: false, message: "User with this email already exists", type: "email" });
        }

        const foundUserByUsername = await User.findOne({ where: { userName } });
        if (foundUserByUsername) {
            return res.json({ status: false, message: "Username is already taken", type: "userName" });
        }

        bcrypt.genSalt(saltRounds, async (err, salt) => {
            if (err) throw err;
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) throw err;

                try {
                    const result = await User.create({ email, password: hash, userName });
                    const payload = {
                        id: result.dataValues.id,
                        email,
                        userName,
                    };

                    const token = jwt.sign(payload, secret, options);
                    return res.json({ status: true, message: `${User.modelName} account created`, token });
                } catch (error) {
                    return res.json({ status: false, error, message: "Something went wrong!", type: "" });
                }
            });
        });
    } catch (error) {
        return res.json({ status: false, error, message: "Something went wrong!", type: "" });
    }
}

async function logInHandler(req, res) {
    try {
        const { email, password, userName, type } = req.body;

        let User;
        if (type === 0) {
            User = Student;
        } else if (type === 1) {
            User = Teacher;
        }

        let foundUser;
        if (email) {
            foundUser = await User.findOne({ where: { email } });
        } else if (userName) {
            foundUser = await User.findOne({ where: { userName } });
        }

        if (!foundUser) {
            return res.json({ status: false, message: "User does not exist!" });
        }

        const isMatch = await comparePassword(password, foundUser.dataValues.password);
        if (isMatch) {
            const tokenData = {
                id: foundUser.dataValues.id,
                email: foundUser.dataValues.email,
                userName: foundUser.dataValues.userName,
            };

            const token = jwt.sign(tokenData, secret, options);
            return res.json({ status: true, message: `${User.modelName} login successful`, token, email: foundUser.dataValues.email, userName: foundUser.dataValues.userName });
        } else {
            return res.json({ status: false, message: "Invalid Password" });
        }
    } catch (error) {
        return res.json({ status: false, error, message: "Something went wrong!" });
    }
}

async function comparePassword(inputPassword, hashedPassword) {
    try {
        const match = await bcrypt.compare(inputPassword, hashedPassword);
        return match;
    } catch (error) {
        console.error('Error comparing passwords:', error);
        throw error;
    }
}

module.exports = router;
