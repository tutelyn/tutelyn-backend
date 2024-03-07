const router = require("express").Router();

router.get("/get-teachers/:latitude/:longitude/:subjectIdString", async (req, res) => {

    const latitude = parseFloat(req.params.latitude);
    const longitude = parseFloat(req.params.longitude);
    console.log("latitude : ", latitude);
    console.log("longitude : ", longitude);

    const subjectIdString = req.params.subjectIdString;
    const subjectIdArray = subjectIdString.split(",");
    let subjectIDqueryString = "";
    for (let i = 0; i < subjectIdArray.length; i++) {
        let temp = `${i > 0 ? " OR " : ""}subjectsIdString LIKE '%${subjectIdArray[i]}%'`
        subjectIDqueryString = subjectIDqueryString + temp;
    }



    const subQueryString = `SELECT *
    FROM teacherdetails
    WHERE ST_DWithin(
        ST_MakePoint(latitude, longitude)::geography,
        ST_MakePoint(${latitude}, ${longitude})::geography, 
        10000
    );`

    const finalQueryString = `SELECT * FROM (${subQueryString}) WHERE ${subjectIDqueryString}`
    console.log(finalQueryString);





});

module.exports = router;