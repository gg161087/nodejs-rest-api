import { getConnection } from './../database/database';
import bcrypt from 'bcrypt';
const jwt = require('jsonwebtoken');

import config from './../config';

const login = async (req, res) => {
  try {
    const connection = await getConnection();
    const { email } = req.body;
    const pwd = req.body.password;
    const password = await bcrypt.hash(pwd, 8);
    const user = await connection.query("SELECT * from users WHERE email = ?", email);
    if(user) {
      const compare = bcrypt.compare(user.password, password);
      if(compare){      
      const token = jwt.sign(user, config.jwt_secret);
      res.send(token);
      }else{
      res.json('Contraseña incorrecta');
      }
    } else {
      res.status(401).send('Email incorrecto');
    } 
       
  } catch (error) {
      res.status(500);
      res.send(error.message);
  }    
};

const register = async (req, res) => {
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
  login,
  register
};