const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { isAdmin } = require('../middleware/roles');
const { createUser, listUsers } = require('../controllers/userController');

router.post('/create', auth, isAdmin, createUser);
router.get('/', auth, isAdmin, listUsers);

module.exports = router;
