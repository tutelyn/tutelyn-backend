const StudentDetails = require("../models/student/studentDetails");
const TeacherDetails = require("../models/teacher/teacherDetails");
const tokenAuthentication = require("../middleware/tokenAuthentication");
const router = require("express").Router();

router.post("/student-details", tokenAuthentication, addStudentDetails);
router.post("/teacher-details", tokenAuthentication, addTeacherDetails);

async function addStudentDetails(req, res) {
    try {
        const {
            firstName,
            lastName,
            phNumber,
            gender,
            latitude,
            longitude,
            pinCode,
            address,
            profileImage,
            currentClass,
            subjects,
            stream,
            subjectsIdString
        } = req.body;

        const studentDetails = {
            firstName,
            lastName,
            phNumber,
            gender,
            latitude,
            longitude,
            pinCode,
            address,
            profileImage,
            currentClass,
            subjects,
            studentId: req.user.id,
            stream,
            subjectsIdString
        };

        await StudentDetails.create(studentDetails);
        console.log("Student details entered");
        return res.json({ status: true, message: "Student details entered" });
    } catch (error) {
        handleErrorResponse(res, error);
    }
}

async function addTeacherDetails(req, res) {
    try {
        const {
            firstName,
            lastName,
            phNumber,
            gender,
            yearOfExp,
            specification,
            subjects,
            latitude,
            longitude,
            pinCode,
            address,
            profileImage,
            qualification,
            aaddharNo,
            subjectsIdString
        } = req.body;

        const teacherDetails = {
            firstName,
            lastName,
            phNumber,
            gender,
            yearOfExp,
            specification,
            subjects,
            latitude,
            longitude,
            pinCode,
            address,
            profileImage,
            qualification,
            aaddharNo,
            teacherId: req.user.id,
            subjectsIdString
        };

        await TeacherDetails.create(teacherDetails);
        console.log("Teacher details entered");
        return res.json({ status: true, message: "Teacher details entered" });
    } catch (error) {
        handleErrorResponse(res, error);
    }
}

function handleErrorResponse(res, error) {
    console.log("ERROR HAPPENS: ", error.name, error);
    if (error.name === 'SequelizeUniqueConstraintError') {
        return res.json({ status: false, message: "You cannot have more than one dataset!" });
    }
    return res.json({ status: false, message: "Something went wrong!" });
}

module.exports = router;
