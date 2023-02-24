import { getConnection } from '../database/database';

const getDistricts = async (req, res) => {
    try {
        const connection = await getConnection();
        const [result] = await connection.query('SELECT * from districts');        
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }    
};
const getDistrict = async (req, res) => {
    try {
        const {id} = req.params;

        const connection = await getConnection();
        const [result] = await connection.query('SELECT * from districts WHERE district_id = ?', id);        
        
        if (result.length > 0) return res.json(result[0]);
        res.status(404).json({
            success: false,
            message: 'district not found.'
        });

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }    
};

const createDistrict = async (req, res)=>{
    try {
        const {descrip, prov_id} = req.body;  

        if ( descrip === undefined || prov_id === undefined){
            res.status(400).json({
                success: false,
                message: 'bad resquest. Please fill all field.'})
        };
        const district = {descrip, prov_id};

        const connection = await getConnection();
        const [result] = await connection.query('INSERT INTO districts SET ?', district);
        
        if (result.affectedRows >= 1) return res.json({
            success: true,
            message: 'district added.',
            id: result.insertId
        });        
        res.json({
            success: false,
            message: 'district not created.'
        });   
        
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }  
};

const updateDistrict = async (req, res)=>{
    try {
        const {id} = req.params;
        const {descrip, prov_id} = req.body;

        if (descrip === undefined || prov_id === undefined || id === undefined){
            res.status(400).json({
                success: false,
                message: 'bad resquest. Please fill all field.'})
        };

        const partido = {descrip, prov_id};

        const connection = await getConnection();                
        const [result] = await connection.query('UPDATE districts SET ? WHERE district_id = ?', [partido, id]);

        if (result.affectedRows >= 1) return res.json({                
            success: true,
            message: 'district update.',
            id: id
        });        
        res.status(404).json({
            success: false,
            message: 'district not found.'
        }); 

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }   
};

const deleteDistrict = async (req, res)=>{
    try {
        const {id} = req.params;

        const connection = await getConnection();
        const [result] = await connection.query('DELETE from districts WHERE district_id = ?', id); 

        if (result.affectedRows >= 1) return res.json({
            success: true,
            message: `district with id:${id} delete.`
        });
        res.status(404).json({
            success: false,
            message: 'district not found.'
        });

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }   
};

export const methods = {
    getDistricts,
    getDistrict,
    createDistrict,
    updateDistrict,
    deleteDistrict
};