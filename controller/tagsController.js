//impotrs
import { db } from '../config/db.js'
//register user
export const Addtage = (req, res) => {
        const { name } = req.body;
        if (!name) return res.status(400).json({ message: 'name tage required' });

        db.query("INSERT INTO tags(name) VALUES(?)", [name], (err, result) => {
            if (err) {
                // handle duplicate email (MySQL ER_DUP_ENTRY) or other DB errors
                if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ message: 'categorie already exists' });
                return res.status(500).json({ err: `add tage failed ${err}` });
            }
            return res.status(201).json({ message: 'Tage add successfully' });
        });
    }
    //get all posts
export const getAllTages = (req, res) => {
        db.query("SELECT * FROM tags ", (err, result) => {
            if (err) return res.status(500).json({ meassage: 'failed to get all post' });
            if (result === 0) return res.status(400).json({ message: 'The post is not found' });
            return res.status(200).json(result[0]);
        });
    }
    //read by id
export const gettagesById = (req, res) => {
        const { id } = req.params;
        db.query("SELECT *  FROM tags  WHERE id=?", [id], (err, result) => {
            if (err) return res.status(500).json({ meassage: 'failed to find the posts' });
            if (result.length === 0) return res.status(400).json({ message: 'posts not found' });
            return res.status(200).json({ result })
        })
    }
    //update posts
export const updateages = (req, res) => {
        const { id } = req.params;
        const { name } = req.body;
        db.query("UPDATE tags SET name=? where id=?", [name, id], (err, result) => {
            if (err) return res.status(500).json({ message: 'failed to update posts' });
            return res.status(200).json({ message: 'posts updated' });


        })
    }
    //delete posts
export const deleteTages = (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM tags WHERE id=?", [id], (err) => {
        if (err) return res.status(500).json({ err: `Failed to  categorie deleted${err}` });
        return res.status(200).json({ message: 'categorie was succefully deleted' });
    })
}