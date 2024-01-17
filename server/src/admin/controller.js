const pool = require("../../db");
const queries = require("./queries");

const getEmployees = (req, res) => {
    try {
        pool.query(queries.getEmployees, (error, result) => {
            if (error) throw error;
            console.log(result.rows)
            res.status(200).json(result.rows);
        });
    } catch (error) {
        res.status(500);
    }
}

const getHouses = (req, res) => {
    try {
        pool.query(queries.getHouses, (error, result) => {
            if (error) throw error;
            console.log(result.rows)
            res.status(200).json(result.rows);
        });
    } catch (error) {
        res.status(500);
    }
}

module.exports = {
    getEmployees,
    getHouses,
}