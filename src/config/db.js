const mysql = require('mysql');
const { promisify } = require('util');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('./config');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database
});

const query = promisify(pool.query).bind(pool);

async function createUser(name, email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);
  return { id: result.insertId, name, email };
}

async function getUserById(id) {
  const rows = await query('SELECT id, name, email FROM users WHERE id = ?', [id]);
  if (rows.length === 0) throw new Error('El usuario no fue encontrado');
  return rows[0];
}

async function getUserByEmail(email) {
  const rows = await query('SELECT * FROM users WHERE email = ?', [email]);
  if (rows.length === 0) throw new Error('El usuario no fue encontrado');
  return rows[0];
}

async function verifyPassword(user, password) {
  return await bcrypt.compare(password, user.password);
}

async function generateToken(user) {
  const token = jwt.sign({
    name: user.name,
    id: user.id
  }, config.jwt_secret)

  return token;
}

module.exports = { createUser, getUserById, getUserByEmail, verifyPassword, generateToken };