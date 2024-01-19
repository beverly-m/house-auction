const pool = require("../../db");
const validateForm = require("./middleware");
const queries = require("./queries");
const bcrypt = require("bcrypt");

const { SALT_ROUNDS } = process.env;

const login = (req, res) => {
    validateForm(req, res);
}

const signup = async (req, res) => {
    validateForm(req, res);

    const { email, password } = req.body.vals;

    const existingUser = await pool.query(queries.getUser, [email]);

    if (existingUser.rowCount === 0) {
        // register user
        const hashedPass = await bcrypt.hash(password, SALT_ROUNDS);
        const newUser = await pool.query("INSERT INTO users(email, user_password) values($1, $2, $3) RETURNING email, user_role", [email, password, 'admin']);

        res.json({loggedIn: true, email});
        
    } else {
        res.json({
            loggedIn: false, 
            status: "Email address taken."
        });
    }
}

const logout = (req, res) => {
    
}

const changepassword = (req, res) => {
    
}

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

const getDashboardStats = async (req, res) => {
    try {
        // employees with bid / total employees
        const employeeBids = await pool.query(queries.getEmployeeBids);
        const employees = await pool.query(queries.getEmployees);

        // houses selected / total houses
        const houseBids = await pool.query(queries.getSelectedHouses);
        const houses = await pool.query(queries.getHouses);

        // houses left
        const unselectedHouses = await pool.query(queries.getUnselectedHouses);

        res.status(200).json({
            bids: employeeBids.rows, 
            num_emp_bids: employeeBids.rowCount, 
            num_employees: employees.rowCount,
            num_h_bids: houseBids.rowCount,
            num_houses: houses.rowCount,
            houses_left: unselectedHouses.rows,
        })
    } catch (error) {
        res.status(500);
    }
}

module.exports = {
    getEmployees,
    getHouses,
    getDashboardStats,
    login,
    logout,
    signup,
    changepassword,
}