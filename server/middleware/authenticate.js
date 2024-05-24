const jwt = require('jsonwebtoken');
const BlacklistedToken = require('../models/BlacklistedToken');

const authenticate = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).send('Authorization header is required and must be Bearer token.');
    }

    const token = authHeader.split(' ')[1];

    // Check if the token is blacklisted
    const tokenInBlacklist = await BlacklistedToken.findOne({ token: token });
    if (tokenInBlacklist) {
        return res.status(401).send('Unauthorized: Token has been blacklisted.');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Add the decoded user info to the request object
        next();
    } catch (error) {
        res.status(401).send('Unauthorized: Invalid token.');
    }
};

module.exports = authenticate;