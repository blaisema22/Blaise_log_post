const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { isAdmin, isAuthor } = require('../middleware/roles');
const controller = require('../controllers/postController');

// public endpoints
router.get('/', controller.listPublished); // ?category=ID&tag=ID&author=ID
router.get('/slug/:slug', controller.getBySlug);

// protected
router.post('/', auth, (req, res, next) => {
  // admin or author can create
  if (req.user.role === 'admin' || req.user.role === 'author') return next();
  return res.status(403).json({ message: 'Admins or Authors only' });
}, controller.createPost);

router.put('/:id', auth, controller.updatePost);
router.delete('/:id', auth, controller.deletePost);

module.exports = router;
