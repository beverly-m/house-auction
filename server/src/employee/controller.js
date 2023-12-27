const pool = require("../../db");
const queries = require("./queries");
const jwt = require('jsonwebtoken');

const { JWT_KEY } = process.env;

/* READ */
// get an employee

const getEmployee = (req, res) => {

    const { id } = req.params;

    try {
        pool.query(queries.getEmployee, [id], (error, result) => {

            // if (error) throw error;

            // check if employee exists 
            if (result.rows.length === 0) {
                res.json({status: 401, error: "Employee number does not exist."});
                return;
            }

            // generate token 
            const token = jwt.sign({username:`${result.rows[0].surname}${result.rows.first_name}`}, JWT_KEY , {expiresIn: "30m"});

            // send employee details 
            res.json({status: 200, token: token});
            // res.cookie("token", token, {
            //     httpOnly: true, 
            //     sameSite: "none",
            //     secure: true,
            // }).json({status: 200, token: token});

        })
    } catch (error) {
        res.status(500);
    } 
    
}

module.exports = {
    getEmployee,
}