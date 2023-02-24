import { getConnection } from '../database/database';
import bcrypt from 'bcrypt';

const getUsers = async (req, res) => {
    try {
        const connection = await getConnection();
        const [users] = await connection.query('SELECT * FROM users');
        if (users.length === 0) {
            return res.status(404).send('Users not found');
        }    
        res.json(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const getUser = async (req, res) => {
  const { id } = req.params;  
    try {
        const connection = await getConnection();
        const [users] = await connection.query('SELECT * FROM users WHERE id = ?', [id]);
        if (users.length === 0) {
            return res.status(404).send('User not found');
        }
        const user = users[0];
        res.send(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const createUser = async (req, res) => {
    try {
        const { name, email, rol } = req.body;
        const pwd = req.body.password;

        if (name === undefined || email === undefined || pwd === undefined){
            res.status(400).json({ message: 'Bad Request. Please fill all fields.' })
        }
        const password = await bcrypt.hash(pwd, 8);
        const user = { name, email, password, rol }

        const connection = await getConnection();
        const result = await connection.query('INSERT INTO users SET ?', user)

        if(result){
            res.json({ succes: true, id: result.insertId, name, email });
        }

    } catch (error) {
        res.status(500).send(error.message);
    };
};

const updateUser = async (req, res)=>{
  try {
      const {id} = req.params;

      const {name, email, rol} = req.body;
      const pwd = req.body.password;
                     
      if (name===undefined || email===undefined || rol===undefined || pwd===undefined ){
          res.status(400).json({
              success: false,
              message: "bad resquest. Please fill all field."})
      };

      const password = await bcrypt.hash(pwd, 8);  
      const user = {name, email, rol, password};
      
      const connection = await getConnection();                
      const [result] = await connection.query("UPDATE users SET ? WHERE ID = ?", [user, id]);

      if (result.affectedRows >= 1) return res.json({                
          success: true,
          message: "user update.",
          id: id
      });        
      res.status(404).json({
          success: false,
          message: "user not found."
      });  
       
  } catch (error) {
      res.status(500);
      res.send(error.message);
  }   
};

const deleteUser = async (req, res)=>{
  try {
      const {id} = req.params;
      const connection = await getConnection();
      const [result] = await connection.query("DELETE from users WHERE ID = ?", id);        
      
      if (result.affectedRows >= 1) return res.json({
          success: true,
          message: `user with id:${id} delete.`
      });
      res.status(404).json({
          success: false,
          message: "user not found."
      }); 

  } catch (error) {
      res.status(500);
      res.send(error.message);
  }   
};

export const methods = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
};