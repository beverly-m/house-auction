const getEmployees = "SELECT employees.company_no, first_name, surname, house_no, house_alias_no FROM employees FULL OUTER JOIN employee_houses ON employee_houses.company_no = employees.company_no";
const getEmployeeBids = "SELECT employees.company_no, first_name, surname, house_no, house_alias_no FROM employees INNER JOIN employee_houses ON employee_houses.company_no = employees.company_no";
const getHouses = "SELECT * FROM (SELECT houses.house_no, alias_no, employee_houses.company_no, first_name, surname FROM houses FULL OUTER JOIN employee_houses ON employee_houses.house_no = houses.house_no FULL OUTER JOIN employees ON employees.company_no = employee_houses.company_no) as h WHERE h.house_no IS NOT NULL";
const getUnselectedHouses = "SELECT * FROM houses h WHERE NOT EXISTS (SELECT FROM employee_houses WHERE house_alias_no = h.alias_no)";

module.exports = {
    getEmployees,
    getEmployeeBids,
    getHouses,
    getUnselectedHouses,
}