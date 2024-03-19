const router = require("express").Router();
const { QueryTypes } = require('sequelize');
const sequelize = require("../db/database");
const Student = require("../models/student/student");
const StudentDetails = require("../models/student/studentDetails");

router.get("/:id", async (req, res) => {
    try {
        const student_id = req.params.id
        console.log()
        const foundUser = await Student.findOne({ where: { id: student_id } })
        console.log(foundUser)
        const moreDetails = await StudentDetails.findOne({ where: { studentId: student_id } })
        return res.json({ status: true, basic_data: foundUser, more_detail: moreDetails });
    } catch (error) {
        console.log(error)
        return res.json({ status: false, error });
    }
})

module.exports = router;