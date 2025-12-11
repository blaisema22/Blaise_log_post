const db = require('../config/db');

// create post (author or admin)
exports.createPost = async (req, res) => {
  try {
    const { title, slug, content, status='draft', category_id=null, tag_id=null } = req.body;
    if (!title || !slug) return res.status(400).json({ message: 'title and slug required' });

    await db.query(
      'INSERT INTO posts (title,slug,content,status,category_id,tag_id,author_id,created_at) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())',
      [title, slug, content, status, category_id, tag_id, req.user.id]
    );
    res.json({ message: 'Post created' });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') return res.status(400).json({ message: 'Slug already exists' });
    res.status(500).json({ message: err.message });
  }
};

// list published posts with optional filters
exports.listPublished = async (req, res) => {
  try {
    const { category, tag, author } = req.query;
    let sql = 'SELECT p.*, u.name as author_name, c.name as category_name, t.name as tag_name FROM posts p LEFT JOIN users u ON p.author_id=u.id LEFT JOIN categories c ON p.category_id=c.id LEFT JOIN tags t ON p.tag_id=t.id WHERE p.status="published"';
    const params = [];
    if (category) { sql += ' AND p.category_id=?'; params.push(category); }
    if (tag) { sql += ' AND p.tag_id=?'; params.push(tag); }
    if (author) { sql += ' AND p.author_id=?'; params.push(author); }
    sql += ' ORDER BY p.created_at DESC';
    const [rows] = await db.query(sql, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get post by slug
exports.getBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const [rows] = await db.query('SELECT p.*, u.name as author_name FROM posts p LEFT JOIN users u ON p.author_id=u.id WHERE p.slug=? AND p.status="published"', [slug]);
    if (rows.length === 0) return res.status(404).json({ message: 'Not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// update post (admin can update any; author only own post)
exports.updatePost = async (req, res) => {
  try {
    const id = req.params.id;
    // check ownership or admin
    const [rows] = await db.query('SELECT * FROM posts WHERE id=?', [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Post not found' });
    const post = rows[0];
    if (req.user.role !== 'admin' && req.user.id !== post.author_id) {
      return res.status(403).json({ message: 'Not allowed' });
    }

    const { title, slug, content, status, category_id, tag_id } = req.body;
    await db.query('UPDATE posts SET title=?, slug=?, content=?, status=?, category_id=?, tag_id=? WHERE id=?', [title||post.title, slug||post.slug, content||post.content, status||post.status, category_id||post.category_id, tag_id||post.tag_id, id]);
    res.json({ message: 'Updated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    const [rows] = await db.query('SELECT * FROM posts WHERE id=?', [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Post not found' });
    const post = rows[0];
    if (req.user.role !== 'admin' && req.user.id !== post.author_id) {
      return res.status(403).json({ message: 'Not allowed' });
    }
    await db.query('DELETE FROM posts WHERE id=?', [id]);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
