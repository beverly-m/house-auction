const { Router } = require("express");
const controller = require("./controller");

const employeeRoutes = Router();

employeeRoutes.post("/:id", controller.getEmployee);

module.exports = employeeRoutes;