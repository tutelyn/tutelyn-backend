const StudentDetails = require("../models/student/studentDetails");
const TeacherDetails = require("../models/teacher/teacherDetails");
const tokenAuthentication = require("../middleware/tokenAuthentication")

const router = require("express").Router()


router.post("/student-details", tokenAuthentication, (req, res) => {

    console.log(req.user);
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let phNumber = req.body.phNumber;
    let gender = req.body.gender;
    let latitude = req.body.latitude;
    let longitude = req.body.longitude;
    let pinCode = req.body.pinCode;
    let address = req.body.address;
    let profileImage = req.body.profileImage;
    let currentClass = req.body.currentClass;
    let subjects = req.body.subjects;
    let stream = req.body.stream;
    let subjectsIdString = req.body.subjectsIdString;


    StudentDetails.create({
        firstName: firstName,
        lastName: lastName,
        phNumber: phNumber,
        gender: gender,
        latitude: latitude,
        longitude: longitude,
        pinCode: pinCode,
        address: address,
        profileImage: profileImage,
        currentClass: currentClass,
        subjects: subjects,
        studentId: req.user.id,
        stream: stream,
        subjectsIdString: subjectsIdString,
    })
        .then((result) => {
            console.log("Teacher details entered");
            return res.json({ status: true, message: "Student details entered" });
        }).catch((error) => {
            console.log("ERROR HAPPENS: ", error.name);
            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.json({ status: false, message: "You can not have more than dataset!" });
            }
            console.log(error);
            return res.json({ status: false, message: "Something went wrong!" });

        })
})

router.post("/teacher-details", tokenAuthentication, (req, res) => {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let phNumber = req.body.phNumber;
    let gender = req.body.gender;
    let yearOfExp = req.body.yearOfExp;
    let specification = req.body.specification;
    let subjects = req.body.subjects;
    let latitude = req.body.latitude;
    let longitude = req.body.longitude;
    let pinCode = req.body.pinCode;
    let address = req.body.address;
    let profileImage = req.body.profileImage;
    let qualification = req.body.qualification;
    let aaddharNo = req.body.aaddharNo;
    let subjectsIdString = req.body.subjectsIdString;

    TeacherDetails.create({
        firstName: firstName,
        lastName: lastName,
        phNumber: phNumber,
        gender: gender,
        yearOfExp: yearOfExp,
        specification: specification,
        subjects: subjects,
        subjectsIdString: subjectsIdString,
        latitude: latitude,
        longitude: longitude,
        pinCode: pinCode,
        address: address,
        profileImage: profileImage,
        qualification: qualification,
        aaddharNo: aaddharNo,
        teacherId: req.user.id
    })
        .then((result) => {
            console.log("Teacher details entered");
            return res.json({ status: true, message: "Teacher details entered" });
        }).catch((error) => {
            console.log("ERROR HAPPENS: ", error.name, error);
            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.json({ status: false, message: "You can not have more than dataset!" });
            }
            return res.json({ status: false, message: "Something went wrong!" });
        })
})

module.exports = router;