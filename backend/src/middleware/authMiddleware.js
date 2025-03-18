const jwt = require('jsonwebtoken');

//checking  Authorization or non Authorization
exports.authMiddleware = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({ message: 'No token provided' });
    }

    // Extract token from 'Bearer <token>'
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token missing from header' });
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.error('Token verification error:', err.message);
                return res.status(403).json({ message: 'Invalid token' });
            }

            req.user = decoded;
            next();
        });
    } catch (err) {
        console.error('Unexpected error:', err.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

//user admin part
exports.adminUserMiddleware = (req, res, next) => {
    if (req.user.role === 'admin') {
        next();
    } else if (req.user.role === 'user') {
        next();
    } else {
        return res.status(403).json({message: 'Access denied'});
    }
};

//admin part
exports.adminMiddleware = (req, res, next) => {
    if (req.user.role === 'admin') {
        next();
    } else {
        return res.status(403).json({message: 'Access denied'});
    }
};

//user part
exports.userMiddleware = (req, res, next) => {
    if (req.user.role === 'user') {
        next();
    } else {
        return res.status(403).json({message: 'Access denied'});
    }
};

