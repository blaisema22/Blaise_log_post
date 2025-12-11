const express = require('express');
const app = express();

app.use(express.json());

// Routes
app.use('/auth', require('./routes/authRoutes'));
app.use('/users', require('./routes/userRoutes'));
app.use('/posts', require('./routes/postRoutes'));
app.use('/categories', require('./routes/categoryRoutes'));
app.use('/tags', require('./routes/tagRoutes'));

// default
app.get('/', (req, res) => res.json({ message: 'Blog API' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running on port', PORT));
