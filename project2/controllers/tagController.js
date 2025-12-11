const db = require('../config/db');

exports.list = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM tags ORDER BY name');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: 'name required' });
    await db.query('INSERT INTO tags (name, created_at) VALUES (?, NOW())', [name]);
    res.json({ message: 'Created' });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') return res.status(400).json({ message: 'Tag exists' });
    res.status(500).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const { name } = req.body;
    await db.query('UPDATE tags SET name=? WHERE id=?', [name, id]);
    res.json({ message: 'Updated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const id = req.params.id;
    await db.query('DELETE FROM tags WHERE id=?', [id]);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
