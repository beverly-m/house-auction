const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.get("/", controller.getAvailableHouses);

module.exports = router;