const pool = require("../../db");
const queries = require("./queries");
const jwt = require('jsonwebtoken');


const { JWT_KEY } = process.env;


/* CREATE */
// create new employee house bid 
const addEmployeeBid = async (req, res) => {

    // verify token
    const { id, token } = req.params;
    

    try {
        jwt.verify(token, JWT_KEY)
    } catch (error) {
        res.clearCookie("token");
        resjson({status: 401, error: "unauthorized"});
        return;
    }

    const { alias } = req.body;
    
    try {

        const selected = await pool.query(queries.getHouseBid, [id]);

        // check if employee already selected a house
        if (selected.rows.length === 1) {
            return res.json({status: 409, error: "Employee already selected a house."});
        }

        const matchAlias = await pool.query(queries.getHouseBidByAlias, [alias]);

        // check if house with matching alias has already been selected
        if (matchAlias.rows.length === 1) {
            return res.json({status: 409, error: "House property number already taken."});
        }
        
        // get house matching the alias number
        const house = await pool.query(queries.getHouseByAlias, [alias])

        // add house bid 
        pool.query(queries.addHouseBid, [id, house.rows[0].house_no, alias], (error, result) => {
            if (error) {
                return res.json({status: 409, error: "House property number already taken."});
            }
            res.status(201).json(result.rows[0]);
        })

    } catch (error) {
        res.status(500);
    }

}

/* READ */
// get an employee house bid 
const getEmployeeBid = (req, res) => {

    // verify token
    const { id, token } = req.params;

    console.log(`Request: ${JSON.stringify(req.params)}`)

    try {
        jwt.verify(token, JWT_KEY)
    } catch (error) {
        res.clearCookie("token");  
        res.json({status: 401, error: "unauthorized"});
        return;
    }

    // check if employee has bid

    try {
        pool.query(queries.getHouseBid, [id], (error, result) => {
            if (error) throw error;
            
            // if employee has no bid
            if (result.rows.length === 0) {
                res.json({status: 404, bid: "None"}); 
                return;
            }

            console.log(`bid: ${JSON.stringify(result.rows[0])}`)

            // if employee has bid 
            res.status(200).json({bid: result.rows[0]})
        })
    } catch (error) {
        res.status(500);
    }
}

module.exports = {
    addEmployeeBid,
    getEmployeeBid,
}