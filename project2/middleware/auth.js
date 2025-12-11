const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'CHANGE_THIS_SECRET';

module.exports = async function (req, res, next) {
  try {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ message: 'No token provided' });
    const token = header.split(' ')[1];
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
