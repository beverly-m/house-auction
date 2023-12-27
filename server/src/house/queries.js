const getAvailableHouses = "SELECT alias_no FROM houses h WHERE NOT EXISTS (SELECT FROM employee_houses WHERE house_alias_no = h.alias_no)";

module.exports = {
    getAvailableHouses,
}