//import
import { db } from '../config/db.js'
//add a Post
export const Addpost = (req, res) => {
        const { title, slug, content, status, category_id, author_id } = req.body;
        if (!title || !slug || !content || !status || !category_id || !author_id) return res.status(400).json({ message: 'title, slug, content, status, category_id and author_id are required' });
        db.query("INSERT INTO posts(title, slug, content, status, category_id, author_id) VALUES(?,?,?,?,?,?)", [title, slug, content, status, category_id, author_id], (err, result) => {
            if (err) {
                return res.status(500).json({ err: `failed create a post ${err}` });
            }
            return res.status(201).json({ message: 'create a post successfully' });
        });
    }
    //get all posts
export const getAllposts = (req, res) => {
        db.query("SELECT * FROM posts", (err, result) => {
            if (err) return res.status(500).json({ meassage: 'failed to get all post' });
            if (result === 0) return res.status(400).json({ message: 'The post is not found' });
            return res.status(200).json(result[0]);
        });
    }
    //read by id
export const getpostsById = (req, res) => {
        const { id } = req.params;
        db.query("SELECT *  FROM posts WHERE id=?", [id], (err, result) => {
            if (err) return res.status(500).json({ meassage: 'failed to find the posts' });
            if (result.length === 0) return res.status(400).json({ message: 'posts not found' });
            return res.status(200).json({ result })
        })
    }
    //update posts
export const updatePosts = (req, res) => {
        const { id } = req.params;
        const { title, slug, content, status, category_id, author_id } = req.body;
        db.query("UPDATE posts SET title=?, slug=?, content=?, status=?, category_id=?, author_id=? WHERE id=? ", [title, slug, content, status, category_id, author_id], (err, result) => {
            if (err) return res.status(500).json({ message: 'failed to update posts' });
            return res.status(200).json({ message: 'posts updated' });


        })
    }
    //delete posts
export const deletePosts = (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM posts WHERE id=?", [id], (err) => {
        if (err) return res.status(500).json({ err: `Failed to  categorie deleted${err}` });
        return res.status(200).json({ message: 'categorie was succefully deleted' });
    })
}