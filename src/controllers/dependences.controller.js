import { getConnection } from '../database/database';

const getDependences = async (req, res) => {
    try {
        const connection = await getConnection();
        const [result] = await connection.query('SELECT * from dependences');        
        res.json(result);

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }    
};
const getDependence = async (req, res) => {
    try {
        const {id} = req.params;

        const connection = await getConnection();
        const [result] = await connection.query('SELECT * from dependences WHERE dep_id = ?', id); 

        if (result.length > 0) return res.json(result[0]);
        res.status(404).json({
            success: false,
            message: 'dependence not found.'
        });              
        
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }    
};

const createDependence = async (req, res)=>{
    try {
        const descrip = req.body;  

        if ( descrip === undefined){
            res.status(400).json({message: 'Bad Resquest. Please fill all field.'})
        };

        const connection = await getConnection();
        const [result] = await connection.query('INSERT INTO dependences SET ?', descrip);
        
        
        if (result.affectedRows >= 1) return res.json({
            success: true,
            message: 'dependence added.',
            id: result.insertId
        });        
        res.json({
            success: false,
            message: 'dependence not created.'
        });    
        
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }  
};

const updateDependence = async (req, res)=>{
    try {
        const {id} = req.params;
        const descrip = req.body;

        if ( descrip === undefined || id === undefined){
            res.status(400).json({message: 'Bad Resquest. Please fill all field.'})
        };

        const connection = await getConnection();               
        const [result] = await connection.query('UPDATE dependences SET ? WHERE dep_id = ?', [descrip, id]);

        if (result.affectedRows >= 1) return res.json({                
            success: true,
            message: 'dependence update.',
            id: id
        });        
        res.status(404).json({
            success: false,
            message: 'dependence not found.'
        });

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }   
};

const deleteDependence = async (req, res)=>{
    try {
        const {id} = req.params;

        const connection = await getConnection();
        const [result] = await connection.query('DELETE from dependences WHERE dep_id = ?', id);

        if (result.affectedRows >= 1) return res.json({
            success: true,
            message: `dependence with id:${id} delete.`
        });
        res.status(404).json({
            success: false,
            message: 'dependence not found.'
        });

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }   
};

export const methods = {
    getDependences,
    getDependence,
    createDependence,
    updateDependence,
    deleteDependence
};