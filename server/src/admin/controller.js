const pool = require("../../db");
const validateForm = require("./middleware");
const queries = require("./queries");
const bcrypt = require("bcrypt");

const { SALT_ROUNDS } = process.env;

const login = async (req, res) => {
    console.log(req.session.user);

    try {
        validateForm(req, res);

        const { email, password } = req.body.vals;

        const attemptLogin = await pool.query(queries.getUser, [email]);

        if (attemptLogin.rowCount === 0) {
            console.log("Failed login username")
            return res.status(401).json({
                loggedIn: false, 
                status: "Wrong email or password"
            });
        } else {
            const isValidPassword = await bcrypt.compare(password, attemptLogin.rows[0].user_password);

            if (isValidPassword) {
                req.session.user = {
                    email: email, 
                    role: attemptLogin.rows[0].user_role,
                };

                return res.status(200).json({
                    loggedIn: true, 
                    email: email, 
                    role: attemptLogin.rows[0].user_role 
                });
            } else {
                console.log("Failed login password")
                return res.status(401).json({
                    loggedIn: false, 
                    status: "Wrong email or password"
                });
            }
        }

    } catch (error) {
        console.log(error);
        res.status(500);
    }
}

const signup = async (req, res) => {
    try {
        validateForm(req, res);

        const { email, password } = req.body.vals;

        const existingUser = await pool.query(queries.findUser, [email]);

        if (existingUser.rowCount === 0) {
            // register user
            const hashedPass = await bcrypt.hash(password, parseInt(SALT_ROUNDS));
            const newUser = await pool.query(queries.addUser, [email, hashedPass, 'admin']);

            req.session.user = {
                email: email, 
                role: newUser.rows[0].user_role,
            }
            console.log("User created");
            res.status(200).json({
                loggedIn: true, 
                email: email, 
                role: newUser.rows[0].user_role 
            });
            return;

        } else {
            console.log("Herrrreeeee")
            res.status(401).json({
                loggedIn: false, 
                status: "Email address taken."
            });
            return;
        }
    } catch (error) {
        console.log(error);
        res.status(500);
    }
    
}

const checkLoggedIn = (req, res) => {
    console.log(`Session: ${JSON.stringify(req.session)}`)
    if (req.session.user && req.session.user.email) {
        console.log("logged in")
        res.status(200).json({loggedIn: true, email: req.session.user.email, role: req.session.user.role});
    } else {
        res.status(200).json({loggedIn: false, email: null, role: null});
    }
}

const logout = (req, res) => {
    
}

const changepassword = (req, res) => {
    
}

const getAdmins = async (req, res) => {
    try {
        const users = await pool.query(queries.getAdmins);
        res.status(200).json({ users: users.rows });
    } catch (error) {
        res.status(500);
    }
}

const addAdmin = async (req, res) => {
    try {
        validateForm(req, res);

        const { email, password } = req.body.vals;

        const existingUser = await pool.query(queries.findUser, [email]);

        if (existingUser.rowCount === 0) {
            // register user
            const hashedPass = await bcrypt.hash(password, parseInt(SALT_ROUNDS));
            const newUser = await pool.query(queries.addUser, [email, hashedPass, 'viewer']);

            console.log("User created");
            res.status(200).json({status: "User added"});
            return;

        } else {
            res.status(401).json({
                status: "Email address taken."
            });
            return;
        }
    } catch (error) {
        console.log(error);
        res.status(500);
    }
    
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
    getAdmins,
    addAdmin,
    login,
    checkLoggedIn,
    logout,
    signup,
    changepassword,
}