const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.post("/:id/:token", controller.addEmployeeBid);

router.get("/:id/:token", controller.getEmployeeBid);

module.exports = router;