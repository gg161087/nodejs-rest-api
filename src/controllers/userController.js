const connection = require('../config/database');

module.exports = {

  createUser : async (req, res) => {
    const { name, email, age } = req.body;
  
    try {
      const result = await connection.query('INSERT INTO users (name, email, age) VALUES (?, ?, ?)', [name, email, age]);
      const user = { id: result.insertId, name, email, age };
      res.status(201).send(user);
    } catch (err) {
      res.status(400).send(err.message);
    }
  },
  
  getUsers : async (req, res) => {  
  
    try {
      const users = await connection('SELECT * FROM users');
      if (users.length === 0) {
        return res.status(404).send('Users not found');
      }    
      res.send(users);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
  
  getUser : async (req, res) => {
    const { id } = req.params;
  
    try {
      const users = await connection('SELECT * FROM users WHERE id = ?', [id]);
      if (users.length === 0) {
        return res.status(404).send('User not found');
      }
      const user = users[0];
      res.send(user);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
  
  updateUser : async (req, res) => {
    const { id } = req.params;
    const { name, email, age } = req.body;
  
    try {
      const result = await connection('UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?', [name, email, age, id]);
      if (result.affectedRows === 0) {
        return res.status(404).send('User not found');
      }
      const user = { id, name, email, age };
      res.send(user);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
  
  deleteUser : async (req, res) => {
    const { id } = req.params;
  
    try {
      const result = await connection('DELETE FROM users WHERE id = ?', [id]);
      if (result.affectedRows === 0) {
        return res.status(404).send('User not found');
      }
      res.send('User deleted');
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
}