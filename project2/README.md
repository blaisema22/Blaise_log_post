# Blog API (Node.js + Express + MySQL2)

This project implements the Backend Development Assessment:
- JWT auth
- 3 roles: admin (max 2), author, reader
- Admins register users
- Raw SQL queries using mysql2 (no ORM)
- CRUD endpoints for posts, categories, tags
- Public endpoints for fetching published posts and filtering

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create MySQL database and import schema:
- Create database `blog_api` and run the `schema.sql` file included.

3. Configure DB credentials:
- Edit `config/db.js` to set your MySQL host/user/password/database.

4. Start server:
```bash
node server.js
```

## Important notes
- Only admins (created by an existing admin) can create new users. Creating a new admin will be rejected if 2 admins already exist.
- Default JWT secret is `CHANGE_THIS_SECRET` in code; replace with env var in production.

