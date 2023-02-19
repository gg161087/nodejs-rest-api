const mysql = require('mysql');
const { promisify } = require('util');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
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
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET);
}

module.exports = { createUser, getUserById, getUserByEmail, verifyPassword, generateToken };