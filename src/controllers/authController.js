const connection = require('../config/database');
const jwt = require('jsonwebtoken');

async function login(req, res) {
  try {
    const { email, password } = req.body;    
    const user = await connection.query("SELECT * from users WHERE email AND password = ?, ?", email, password);             
    if (!user) return res.status(401).send('Email o contraseña incorrectos');
    const token = jwt.sign(user);
    res.send(token);   

  } catch (error) {
      res.status(500);
      res.send(error.message);
  }    
};
/*
function login(req, res) {
  const { email, password } = req.body;
  const user = db.getUserByEmail(email);
  if (!user) return res.status(401).send('Email o contraseña incorrectos');
  const validPassword = db.verifyPassword(password, user.password);
  if (!validPassword) return res.status(401).send('Email o contraseña incorrectos');
  const token = db.generateToken(user);
  res.send(token);
}
*/
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