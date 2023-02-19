const User = require('../models').User;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(401).send('Email o contraseña incorrectos');
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(401).send('Email o contraseña incorrectos');
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
  res.send(token);
}

async function register(req, res) {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) return res.status(400).send('El usuario ya existe');
  const user = await User.create({
    name,
    email,
    password: await bcrypt.hash(password, 10),
  });
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
  res.send(token);
}

module.exports = { login, register };