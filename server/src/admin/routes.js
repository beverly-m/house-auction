const { Router } = require("express");
const controller = require("./controller");

const adminRoutes = Router();

adminRoutes.get("/dashboard", controller.getDashboardStats);
adminRoutes.get("/employees", controller.getEmployees);
adminRoutes.get("/houses", controller.getHouses);
adminRoutes.route("/").get(controller.checkLoggedIn).post(controller.login); 
adminRoutes.post("/register", controller.signup);

module.exports = adminRoutes;