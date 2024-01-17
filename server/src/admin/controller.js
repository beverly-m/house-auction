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
}