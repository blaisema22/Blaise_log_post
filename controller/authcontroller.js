import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { db } from '../config/db.js'
//register user
export const register = (req, res) => {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) return res.status(400).json({ message: 'name, email, password and role are required' });

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) return res.status(500).json({ err: 'Error while hashing the password' });

        db.query("INSERT INTO users(name,email,password,role) VALUES(?,?,?,?)", [name, email, hash, role], (err, result) => {
            if (err) {
                // handle duplicate email (MySQL ER_DUP_ENTRY) or other DB errors
                if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ message: 'email already exists' });
                return res.status(500).json({ err: `register failed ${err}` });
            }
            return res.status(201).json({ message: 'User registered successfully' });
        });
    });

}
    //login user
export const login = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'email and password are required' });

    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
        if (err) return res.status(500).json({ err: `user login error occured ${err}` });
        if (!result || result.length === 0) return res.status(404).json({ err: `user not found` });

        // compare password
        bcrypt.compare(password, result[0].password, (err, isMatch) => {
            if (err) return res.status(500).json({ err: `error comparing passwords ${err}` });
            if (!isMatch) return res.status(401).json({ err: 'invalid credentials' });

            //create token
            const token = jwt.sign({ id: result[0].id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
            return res.json({ message: "Successfully logged in", token: token });
        });
    });
}