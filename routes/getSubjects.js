const router = require("express").Router();
const Subject = require("../models/subject/subjects")


router.get("/all-subjects/:classNumber", async (req, res) => {
    const classNumber = req.params.classNumber;
    const subjects = await Subject.findAll({ where: { class: classNumber } });

    return res.json({ subjects: subjects });


});

module.exports = router;