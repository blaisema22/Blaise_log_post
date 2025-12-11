exports.isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admins only' });
  }
  next();
};

exports.isAuthor = (req, res, next) => {
  if (!req.user || req.user.role !== 'author') {
    return res.status(403).json({ message: 'Authors only' });
  }
  next();
};
