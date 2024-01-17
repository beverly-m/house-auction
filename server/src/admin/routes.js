const { Router } = require("express");
const controller = require("./controller");

const adminRoutes = Router();

adminRoutes.get("/employees", controller.getEmployees);
adminRoutes.get("/houses", controller.getHouses);

module.exports = adminRoutes;