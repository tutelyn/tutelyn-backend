const router = require("express").Router();
const { QueryTypes } = require('sequelize');
const sequelize = require("../db/database")



router.get("/get-teachers/:latitude/:longitude/:subjectIdString", async (req, res) => {

    const latitude = parseFloat(req.params.latitude);
    const longitude = parseFloat(req.params.longitude);
    console.log("latitude : ", latitude);
    console.log("longitude : ", longitude);

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

    const finalQueryString = `SELECT * FROM (${subQueryString}) AS subquery_alias WHERE ${subjectIDqueryString}`
    console.log(finalQueryString);

    let data = await sequelize.query(finalQueryString, { type: QueryTypes.SELECT });
    console.log(data);






});

module.exports = router;