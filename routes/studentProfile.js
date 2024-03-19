const router = require("express").Router();
const { QueryTypes } = require('sequelize');
const sequelize = require("../db/database");
const Student = require("../models/student/student");

router.get("/:id", async (req, res) => {
    try {
        const student_id = req.params.id
        console.log()
        const FoundUser = await Student.findOne({ where: { id: student_id } })
        console.log(FoundUser)
        // const FoundUser = await Student.findOne({ where: { studentId: req.user.id } })
        return res.json({ status: true, data: FoundUser });
    } catch (error) {
        console.log(error)
        return res.json({ status: false, error });
    }
})

module.exports = router;