const express = require('express');
const router = express.Router();
const Controllers = require('../controllers/users');
const checkAuth = require('../middlewares/auth');

//TOODOS
//Chenge middlewares and services

router.get('/test', Controllers.testUsers);
router.post('/create/:ref_building?', Controllers.createUsers);


module.exports = router;