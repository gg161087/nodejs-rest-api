const mysql = require('mysql');
const config = require('../config/config');

// Create connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: config.db.host,
  user: config.db.username,
  password: config.db.password,
  database: config.db.name
});

// User model
const User = {
  getAll: function(callback) {
    pool.query('SELECT * FROM users', function(error, results, fields) {
      if (error) {
        return callback(error);
      }

      return callback(null, results);
    });
  },

  getById: function(id, callback) {
    pool.query('SELECT * FROM users WHERE id = ?', [id], function(error, results, fields) {
      if (error) {
        return callback(error);
      }

      if (results.length === 0) {
        return callback(null, null);
      }

      return callback(null, results[0]);
    });
  },

  create: function(newUser, callback) {
    pool.query('INSERT INTO users (name, email) VALUES (?, ?)', [newUser.name, newUser.email], function(error, results, fields) {
      if (error) {
        return callback(error);
      }

      newUser.id = results.insertId;
      return callback(null, newUser);
    });
  },

  update: function(id, updateUser, callback) {
    pool.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [updateUser.name, updateUser.email, id], function(error, results, fields) {
      if (error) {
        return callback(error);
      }

      if (results.affectedRows === 0) {
        return callback(null, null);
      }

      updateUser.id = id;
      return callback(null, updateUser);
    });
  },

  delete: function(id, callback) {
    pool.query('DELETE FROM users WHERE id = ?', [id], function(error, results, fields) {
      if (error) {
        return callback(error);
      }

      if (results.affectedRows === 0) {
        return callback(null, null);
      }

      return callback(null, id);
    });
  }
};

module.exports = User;
