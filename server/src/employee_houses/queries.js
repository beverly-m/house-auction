const getHouseByAlias = "SELECT * FROM houses WHERE alias_no = $1";
const addHouseBid = "INSERT INTO employee_houses (company_no, house_no, house_alias_no) VALUES ($1, $2, $3) RETURNING *";
const getHouseBid = "SELECT * FROM employee_houses WHERE company_no = $1";
const getHouseBidByAlias = "SELECT * FROM employee_houses WHERE house_alias_no = $1";

module.exports = {
    getHouseByAlias,
    addHouseBid,
    getHouseBid,
    getHouseBidByAlias,
}