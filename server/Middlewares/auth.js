require("dotenv").config();

const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(201).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.SECRET_KEY);
        req.user = decoded; 
        next(); 
    } catch (error) {
        res.status(400).json({ message: "Invalid token." });
    }
};

module.exports = authenticate;
