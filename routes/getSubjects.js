const router = require("express").Router();
const Subject = require("../models/subject/subjects")


router.get("/all-subjects", async (req, res) => {

    const subjects = await Subject.findAll();

    return res.json({ subjects: subjects });


});

module.exports = router;