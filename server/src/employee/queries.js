const getEmployee = "SELECT * FROM employees WHERE company_no = $1";

module.exports = {
    getEmployee,
}