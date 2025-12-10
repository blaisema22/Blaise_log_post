//impotrs
import { db } from '../config/db.js'
//register user
export const categories = (req, res) => {
        const { name } = req.body;
        if (!name) return res.status(400).json({ message: 'name categorie required' });

        db.query("INSERT INTO categories(name) VALUES(?)", [name], (err, result) => {
            if (err) {
                // handle duplicate email (MySQL ER_DUP_ENTRY) or other DB errors
                if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ message: 'categorie already exists' });
                return res.status(500).json({ err: `add categories failed ${err}` });
            }
            return res.status(201).json({ message: 'categories add successfully' });
        });
    }
    //read all categories
export const getCategories = (req, res) => {
        db.query("SELECT * FROM categories", (err, result) => {
            if (err) return res.status(500).json({ meassage: 'failed to get all categories' });
            if (result === 0) return res.status(400).json({ message: 'The categories is not found' });
            return res.status(200).json(result[0]);
        });
    }
    //read item by id
export const getcategoriesById = (req, res) => {
        const { id } = req.params;
        db.query("SELECT *  FROM categories WHERE id=?", [id], (err, result) => {
            if (err) return res.status(500).json({ meassage: 'failed to find the categories' });
            if (result.length === 0) return res.status(400).json({ message: 'categories not found' });
            return res.status(200).json({ result })
        })
    }
    //update categories
export const updateCategories = (req, res) => {
        const { id } = req.params;
        const { name } = req.body;
        db.query("UPDATE categories SET name=?", [name], (err, result) => {
            if (err) return res.status(500).json({ message: 'failed to update categories' });
            return res.status(200).json({ message: 'categories updated' });


        })
    }
    //delete categories
export const deletecategory = (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM categories WHERE id=?", [id], (err) => {
        if (err) return res.status(500).json({ err: `Failed to  categorie deleted${err}` });
        return res.status(200).json({ message: 'categorie was succefully deleted' });
    })
}