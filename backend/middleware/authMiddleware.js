const jwt = require('jsonwebtoken');

module.exports = function protect(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer '))
    return res.status(401).json({ message: 'No token, unauthorized' });

  try {
    const token   = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // JWT is signed with { id } but routes use req.user._id — map both
    req.user = { ...decoded, _id: decoded.id };
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};