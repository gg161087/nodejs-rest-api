import { getConnection } from './../database/database';
import bcrypt from 'bcrypt';

const getUsers = async (req, res) => {
  try {
    const connection = await getConnection();
    const users = await connection.query('SELECT * FROM users');
    if (users.length === 0) {
      return res.status(404).send('Users not found');
    }    
    res.json(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;  
    try {
      const connection = await getConnection();
      const users = await connection.query('SELECT * FROM users WHERE id = ?', [id]);
      if (users.length === 0) {
        return res.status(404).send('User not found');
      }
      const user = users[0];
      res.send(user);
    } catch (err) {
      res.status(500).send(err.message);
    }
};

const createUser = async (req, res) => {
  try {

    const { name, email } = req.body;
    const pwd = req.body.password;
    if (name === undefined || email === undefined || pwd === undefined){
      res.status(400).json({ message: 'Bad Request. Please fill all fields.' })
    }
    const password = await bcrypt.hash(pwd, 8);
    const user = { name, email, password }

    const connection = await getConnection();
    const result = await connection.query('INSERT INTO users SET ?', user)

    if(result){
      res.json({ succes: true, id: result.insertId, name, email });
    }

  } catch (error) {
    res.status(500).send(error.message);
  };

};

export const methods = {
  getUsers,
  getUser,
  createUser
};