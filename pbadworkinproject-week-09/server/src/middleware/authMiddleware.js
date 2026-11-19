const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET || 'rahasia_development';
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            message: 'Akses ditolak. Token tidak tersedia.'
        });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next(); // Token valid, lanjutkan ke controller 
    } catch (error) {
        return res.status(403).json({
            message: 'Token tidak valid atau telah kedaluwarsa.'
        });
    }
};
module.exports = {
    authenticateToken
}