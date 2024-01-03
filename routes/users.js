const express = require('express');
const router = express.Router();
const Controllers = require('../controllers/users');
const checkAuth = require('../middlewares/auth');
const uploads = require('../middlewares/uploads');

//TOODOS

router.get('/test', Controllers.testUsers);
router.post('/create/:ref_buildings?', checkAuth.auth, Controllers.createUsers);
router.get('/read/:id', checkAuth.auth, Controllers.readUsersById);
router.get('/read-all', checkAuth.auth, Controllers.readUsers);
router.get('/read-by-buildings/:ref_buildings?', checkAuth.auth, Controllers.readUsers);
router.get('/read-by-companies/:ref_companies?', checkAuth.auth, Controllers.readUsers);
router.put('/update/:id', checkAuth.auth, Controllers.updateUsersById);
router.put('/update-many/:ref_buildings', checkAuth.auth, Controllers.updateUsersByArray);
router.delete('/delete/:id', checkAuth.auth, Controllers.deleteUsersById);

//routes to upload and get files
//router.post('/upload-file/:type/:id', [checkAuth.auth, uploads.single('file0')] ,Controllers.uploadUsersFile);
//router.get('/get-file/:type/:file', checkAuth.auth, Controllers.getUsersFile);

module.exports = router;