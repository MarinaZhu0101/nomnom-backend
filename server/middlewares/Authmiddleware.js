const jwt = require('jsonwebtoken');


const validateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return next(); 
    }

    const token = authHeader.split(' ')[1]; 

    if (!token) {
        return next(); 
    }

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const validToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = validToken;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = validateToken;

