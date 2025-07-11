const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      if (roles.length && !roles.includes(user.role)) {
        return res.status(403).json({ message: 'Forbidden' });
      }
      req.user = user;
      next();
    } catch {
      return res.status(403).json({ message: 'Invalid Token' });
    }
  };
};

module.exports = authMiddleware;
