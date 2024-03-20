const router = require("express").Router();
const { QueryTypes } = require('sequelize');
const sequelize = require("../db/database");
const tokenAuthentication = require("../middleware/tokenAuthentication");



router.post("/create-batch", async (req, res) => {

    const tableName = new Date().getTime().toString() + "_" + Math.floor(Math.random() * 5 * 100000).toString();
    try {
        const data = {
            id: tableName,
            name: req.body.batch_name,
            desc: req.body.desc,
            syllabus: req.body.syllabus,
            class_id: req.body.class_id,
            created_at: new Date().toISOString(),
            // created_at: req.body.created_at,
            students: [],
            subjects: req.body.subjects,
            board: req.body.board,
            teacher_id: req.body.teacher_id,
        }

        let qString = `CREATE TABLE "${tableName}" (
            id VARCHAR(255) PRIMARY KEY,
            name VARCHAR(255),
            description VARCHAR(255),
            syllabus TEXT,
            class_id VARCHAR(255),
            created_at TIMESTAMP,
            students INTEGER[],
            subjects TEXT[],
            board VARCHAR(255),
            teacher_id INTEGER
        );`

        await sequelize.query(qString)

        let insertQuery = `INSERT INTO "${tableName}"(id, name, description, syllabus, class_id , created_at , students , subjects , teacher_id) VALUES ('${tableName}','${data.name}', '${data.desc}', '${data.syllabus}', '${data.class_id}', '${data.created_at}',   '{${data.students}}', '{${data.subjects}}', ${data.teacher_id})`

        await sequelize.query(insertQuery, { type: QueryTypes.INSERT })

        return res.json({ status: true, message: "Batch successfully created" });

    } catch (error) {
        console.log(error)
        return res.json({ status: false, message: "Something went wrong", error });

    }
});

router.put("/update-batch", async (req, res) => {
    try {
        const data = {
            id: req.body.id,
            name: req.body.batch_name,
            desc: req.body.desc,
            syllabus: req.body.syllabus,
            class_id: req.body.class_id,
            students: [],
            subjects: req.body.subjects,
            board: req.body.board
        }

        const updateQuery = `
            UPDATE "${data.id}"
            SET name = '${data.name}', description = '${data.desc}', syllabus ='${data.syllabus}', subjects ='{${data.subjects}}', students ='{${data.students}}', board ='${data.board}'
            WHERE id = '${data.id}'
        `;

        await sequelize.query(updateQuery, { type: QueryTypes.UPDATE })

        return res.json({ status: true, message: "Batch successfully created" });

    } catch (error) {
        console.log(error)
        return res.json({ status: false, message: "Something went wrong", error });

    }
});

router.put("/join-batch", tokenAuthentication, async (req, res) => {

    try {
        studentId = req.body.user.id;
        batchTableID = req.body.id;

        const updateQuery = `
           UPDATE "${batchTableID}"
           SET students = array_append(students, ${studentId})
           WHERE id = '${batchTableID}'
       `;

        await sequelize.query(updateQuery, { type: QueryTypes.UPDATE })
        return res.json({ status: true, message: "You are added to batch" });

    } catch (error) {

        return res.json({ status: false, message: "Something went wrong", error });

    }





})

module.exports = router;