const express = require("express");
const router = express.Router();
const Controllers = require("../controllers/buildings");
const checkAuth = require("../middlewares/auth");

router.post("/create", checkAuth.auth, Controllers.createBuildings);
router.get("/read/:id", checkAuth.auth, Controllers.readBuildingsById);
router.get("/read-all", checkAuth.auth, Controllers.readBuildings);
router.put("/update/:id", checkAuth.auth, Controllers.updateBuildings);
router.delete("/delete/:id", checkAuth.auth, Controllers.deleteBuildings);

module.exports = router;
