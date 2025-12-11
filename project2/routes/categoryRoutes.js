const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { isAdmin } = require('../middleware/roles');
const ctrl = require('../controllers/categoryController');

router.get('/', ctrl.list);
router.post('/', auth, isAdmin, ctrl.create);
router.put('/:id', auth, isAdmin, ctrl.update);
router.delete('/:id', auth, isAdmin, ctrl.remove);

module.exports = router;
