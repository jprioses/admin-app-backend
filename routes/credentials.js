const express = require('express');
const router = express.Router();
const Controllers = require('../controllers/credentials');
const checkAuth = require('../middlewares/auth');


//TOODOS
//Chenge middlewares and services

router.post('/test-create/:user_id', Controllers.createCredentials);
router.post('/login', Controllers.login);
router.post('/create', checkAuth.auth, Controllers.createCredentials);
router.get('/read/:user_id', checkAuth.auth, Controllers.readCredentials);
router.get('/read-user', checkAuth.auth, Controllers.readUserCredentials);
router.get('/read-all', checkAuth.auth, Controllers.readAllCredentials);
router.put('/update/:user_id', checkAuth.auth, Controllers.updateCredentials);
router.delete('/delete/:user_id', checkAuth.auth, Controllers.deleteCredentials);



module.exports = router;