const StudentDetails = require("../models/student/studentDetails");
const TeacherDetails = require("../models/teacher/teacherDetails");
const tokenAuthentication = require("../middleware/tokenAuthentication");
const TeacherClass = require("../models/teacherClass/teacherClass");
const router = require("express").Router();
const { QueryTypes } = require('sequelize');
const sequelize = require("../db/database");

router.post("/student-details", tokenAuthentication, addStudentDetails);
router.post("/teacher-details", tokenAuthentication, addTeacherDetails);
router.post("/update-student-details", tokenAuthentication, updateStudentDetails);
router.post("/update-teacher-details", tokenAuthentication, updateTeacherDetails);



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

        let classes = []
        let classIdArr = []
        for (let i = 0; i < subjects.length; i++) {
            const classId = JSON.parse(decodeURI(subjects[i])).class
            classes.push({ class: classId, teacherid: req.user.id })

            const uniq = new Date().getTime().toString() + "_" + req.user.id.toString() + "_" + classId.toString()
            classIdArr.push(uniq)
        }

        console.log(classIdArr)

        for (let i = 0; i < classIdArr.length; i++) {
            const tableName = classIdArr[i]
            let qString = `CREATE TABLE "${tableName}" (
                id TEXT PRIMARY KEY,
                class INTEGER,
                batch_id_list TEXT[],
                batch_name_list TEXT[],
                teacher_id INTEGER
            );`

            console.log(typeof (classes[i].class), typeof (classes[i].teacherid))

            let insertQuery = `INSERT INTO "${tableName}" VALUES (${tableName},${classes[i].class}, ARRAY[]::TEXT[], ARRAY[]::TEXT[], ${classes[i].teacherid})`

            await sequelize.query(qString)
            await sequelize.query(insertQuery, { type: QueryTypes.INSERT })
        }


        await TeacherDetails.create(teacherDetails);
        await TeacherClass.bulkCreate(classes)
        console.log("Teacher details entered");
        return res.json({ status: true, message: "Teacher details entered" });
    } catch (error) {
        handleErrorResponse(res, error);
    }
}

async function updateStudentDetails(req, res) {

    try {
        let updateData = req.body.updates;
        const FoundUser = await StudentDetails.findOne({ where: { studentId: req.user.id } })
        if (FoundUser != null) {
            FoundUser.set({ ...updateData });
            await FoundUser.save();
            return res.json({ status: true, message: "update successful" });

        } else {
            return res.json({ status: false, message: "Student not found" });
        }

    } catch (error) {

        return res.json({ status: false, message: "Something Went wrong" });

    }

}
async function updateTeacherDetails(req, res) {

    try {
        let updateData = req.body.updates;
        const FoundUser = await TeacherDetails.findOne({ where: { studentId: req.user.id } })
        if (FoundUser != null) {
            FoundUser.set({ ...updateData });
            await FoundUser.save();
            return res.json({ status: true, message: "update successful" });

        } else {
            return res.json({ status: false, message: "Teacher not found" });
        }

    } catch (error) {

        return res.json({ status: false, message: "Something Went wrong" });

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
