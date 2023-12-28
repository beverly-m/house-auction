const pool = require("../../db");
const queries = require("./queries");

/* READ */
// get houses available
const getAvailableHouses = (req, res) => {
    try {
        pool.query(queries.getAvailableHouses, (error, result) => {
            if (error) throw error;

            // if there are no houses available
            if (result.rows.length === 0) {
                res.json({status: 404, houses: "None"}); 
                return;
            }

            // if there are houses available
            res.status(200).json({houses: result.rows})
        })
    } catch (error) {
        
    }
}

module.exports = {
    getAvailableHouses,
}