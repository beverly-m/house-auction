const getEmployees = "SELECT employees.company_no, first_name, surname, house_no, house_alias_no FROM employees FULL OUTER JOIN employee_houses ON employee_houses.company_no = employees.company_no";
const getEmployeeBids = "SELECT employees.company_no, first_name, surname, house_no, house_alias_no FROM employees INNER JOIN employee_houses ON employee_houses.company_no = employees.company_no";
const getHouseBids = "SELECT houses.house_no, alias_no, employee_houses.company_no, first_name, surname FROM houses INNER JOIN employee_houses ON employee_houses.house_no = houses.house_no INNER JOIN employees ON employees.company_no = employee_houses.company_no;"

module.exports = {
    getEmployees,
}