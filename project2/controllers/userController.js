const db = require('../config/db');
const bcrypt = require('bcryptjs');

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'name,email,password,role required' });
    }

    // If creating admin, ensure limit 2
    if (role === 'admin') {
      const [r] = await db.query("SELECT COUNT(*) AS count FROM users WHERE role='admin'");
      if (r[0].count >= 2) {
        return res.status(400).json({ message: 'Maximum of 2 admins allowed' });
      }
    }

    const hashed = await bcrypt.hash(password, 10);
    await db.query(
      'INSERT INTO users (name,email,password,role,created_at) VALUES (?, ?, ?, ?, NOW())',
      [name, email, hashed, role]
    );
    res.json({ message: 'User created' });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') return res.status(400).json({ message: 'Email already exists' });
    res.status(500).json({ message: err.message });
  }
};

exports.listUsers = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, name, email, role, created_at FROM users');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
