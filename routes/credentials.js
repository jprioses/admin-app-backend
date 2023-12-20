const express = require('express');
const router = express.Router();
const Controllers = require('../controllers/credentials');
const checkAuth = require('../middlewares/auth');


//TOODOS
//Chenge middlewares and services

router.get('/test', checkAuth.auth, Controllers.testCredentials);
router.post('/login', Controllers.login);
router.post('/create/:user_id', checkAuth.auth, Controllers.createCredentials);
router.get('/read/:user_id', checkAuth.auth, Controllers.readCredentials);
router.get('/read-user', checkAuth.auth, Controllers.readUserCredentials);
router.put('/update/:user_id', checkAuth.auth, Controllers.updateCredentials);
router.delete('/delete/:user_id', checkAuth.auth, Controllers.deleteCredentials);



module.exports = router;