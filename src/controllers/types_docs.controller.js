import { getConnection } from '../database/database';

const getTypeDocs = async (req, res) => {
    try {
        const connection = await getConnection();
        const [result] = await connection.query('SELECT * from types_docs');        
        res.json(result);

    } catch (error) {        
        res.status(500);
        res.send(error.message);
    }
};
const getTypeDoc = async (req, res) => {
    try {
        const {id} = req.params;
        
        const connection = await getConnection();
        const [result] = await connection.query('SELECT * from types_docs WHERE doc_id = ?', id);

        if (result.length > 0) return res.json(result[0]);
        res.status(404).json({
            success: false,
            message: 'type document not found.'
        });              
        
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }    
};

const createTypeDoc = async (req, res)=>{
    try {
        const descrip = req.body;  

        if ( descrip === undefined){
            res.status(400).json({
                success: false,
                message: 'Bad Resquest. Please fill all field.'});
        };
        
        const connection = await getConnection();
        const [result] = await connection.query('INSERT INTO types_docs SET ?', descrip);
        
        if (result.affectedRows >= 1) return res.json({
            success: true,
            message: 'type document added.',
            id: result.insertId
        });        
        res.json({
            success: false,
            message: 'type document not created.'
        });            
        
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }  
};

const updateTypeDoc = async (req, res)=>{
    try {
        const {id} = req.params;
        const descrip = req.body;

        if ( descrip === undefined || id === undefined){
            res.status(400).json({
                success: false,
                message: 'bad resquest. Please fill all field.'});
        };
        
        const connection = await getConnection();
        const [result] = await connection.query('UPDATE types_docs SET ? WHERE doc_id = ?', [descrip, id]);

        if (result.affectedRows >= 1) return res.json({                
            success: true,
            message: 'type document update.',
            id: id
        });        
        res.status(404).json({
            success: false,
            message: 'type document not found.'
        });       

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }   
};

const deleteTypeDoc = async (req, res)=>{
    try {
        const {id} = req.params;

        const connection = await getConnection();
        const [result] = await connection.query('DELETE from types_docs WHERE doc_id = ?', id);

        if (result.affectedRows >= 1) return res.json({
            success: true,
            message: `type document with id:${id} delete.`
        });
        res.status(404).json({
            success: false,
            message: 'type document not found.'
        });        
         
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }   
};

export const methods = {
    getTypeDocs,
    getTypeDoc,
    createTypeDoc,
    updateTypeDoc,
    deleteTypeDoc
};