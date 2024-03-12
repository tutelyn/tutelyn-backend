const router = require("express").Router();
const { where, Op, QueryTypes } = require("sequelize");
const sequelize = require("../db/database");
const City = require("../models/city/city");

router.get("/get-city-list/:character", async (req, res) => {
    try {
        const character = req.params.character;
        const cities = await City.findAll({
            where: {
                name: {
                    [Op.startsWith]: character
                }
            }
        })
        console.log(cities)
        return res.status(201).json({ cities });
    } catch (error) {
        console.log("ERROR\n", error)
    }
})

module.exports = router;