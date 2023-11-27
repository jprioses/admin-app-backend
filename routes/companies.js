const express = require("express");
const router = express.Router();
const Controllers = require("../controllers/companies");
const checkAuth = require("../middlewares/auth");

router.post("/create", checkAuth.auth, Controllers.createCompanies);
router.get("/read/:id", checkAuth.auth, Controllers.readCompaniesById);
router.get("/read-all", checkAuth.auth, Controllers.readCompanies);
router.put("/update/:id", checkAuth.auth, Controllers.updateCompanies);
router.delete("/delete/:id", checkAuth.auth, Controllers.deleteCompanies);

module.exports = router;