import { getConnection } from './../database/database';
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

import config from './../config';

const login = async (req, res) => {
  try {
    const connection = await getConnection();
    const { email, password } = req.body;

    const user = await connection.query("SELECT * from users WHERE email = ?", email);
    if(user) {      
      const validPassword = await bcrypt.compare(req.body.password, user[0].password);
      if(validPassword){
        const payload = {check: true}                    
        const token = jwt.sign(payload, config.jwt_secret, {expiresIn: '1d'});
        res.json({
          success: true,
          token: token
        });
      }else{
        res.json({
          success: false,
          message: 'Contraseña incorrecta'
        });
      }
    } else {
      res.json({
        success: false,
        message: 'email incorrecta'
      });
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