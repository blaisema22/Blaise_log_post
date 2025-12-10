import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();
export const authernticate = (req, res, next) => {
    const authheader = req.headers['authorization'];
    //bearer token
    const token = authheader && authheader.split(' ')[1]; //[Bearer'Token']
    if (!token) return res.status(403).json({ message: 'Token required' });
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) return res.status(401).json({
            message: `the invalid token  ${err}`
        });
        req.user = user;
        next();
    })
}
export const uatherRole = (roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.include(req.user.role)) {
            // return res.status(200).json({})
        }
        next();
    }
}