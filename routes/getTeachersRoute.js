const router = require("express").Router();
const { QueryTypes } = require('sequelize');
const sequelize = require("../db/database");



router.post("/get-teachers/:latitude/:longitude/:subjectIdString/", async (req, res) => {
    const latitude = parseFloat(req.params.latitude);
    const longitude = parseFloat(req.params.longitude);

    const offset = req.body.offset
    const limit = req.body.limit


    const subjectIdString = req.params.subjectIdString;
    const subjectIdArray = subjectIdString.split(",");
    let subjectIDqueryString = "";
    for (let i = 0; i < subjectIdArray.length; i++) {
        let temp = `${i > 0 ? " OR " : ""}"subjectsIdString" LIKE '%${subjectIdArray[i]}%'`
        subjectIDqueryString = subjectIDqueryString + temp;
    }



    const subQueryString = `SELECT *
    FROM teacherdetails
    WHERE ST_DWithin(
        ST_MakePoint(latitude, longitude)::geography,
        ST_MakePoint(${latitude}, ${longitude})::geography, 
        10000
    )`

    // const finalQueryString = `SELECT * FROM (${subQueryString}) AS subquery_alias WHERE ${subjectIDqueryString}`

    const finalQueryString = `SELECT * FROM (${subQueryString}) AS subquery_alias WHERE ${subjectIDqueryString} OFFSET ${offset} LIMIT ${limit || 10}`
    console.log(finalQueryString);

    let data = await sequelize.query(finalQueryString, { type: QueryTypes.SELECT });
    // console.log(data, data.length);
    let hasMore = true
    if (!data.length) hasMore = false

    return res.json({ status: data, hasMore });




});

module.exports = router;