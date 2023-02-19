const jwt = require('jsonwebtoken');
const { User } = require('../models/userModel');

async function auth(req, res, next) {
  const token = req.header('Authorization').replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ where: { id: decoded.id } });
    if (!user) throw new Error();
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send('No autorizado');
  }
}

module.exports = { auth };