const express = require("express");
const router = express.Router();
const Controllers = require("../controllers/contracts");
const checkAuth = require("../middlewares/auth");
const uploads = require('../middlewares/uploads');

router.post("/create/:ref_buildings", checkAuth.auth, Controllers.createContracts);
router.get("/read/:id", checkAuth.auth, Controllers.readContractsById);
router.get("/read-all/:ref_buildings?", checkAuth.auth, Controllers.readContracts);
router.put("/update/:id", checkAuth.auth, Controllers.updateContracts);
router.delete("/delete/:id", checkAuth.auth, Controllers.deleteContracts);

//routes to upload and get files
//router.post('/upload-file/:type/:id', [checkAuth.auth, uploads.single('file0')] ,Controllers.uploadContractsFile);
//router.get('/get-file/:type/:file', checkAuth.auth, Controllers.getContractsFile);

module.exports = router;