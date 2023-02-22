import {getConnection} from "../database/database"

const getDrivers = async (req, res) => {
    try {
        const connection = await getConnection();
        const [result] = await connection.query("SELECT * from drivers");             
        res.json(result);

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }    
};
const getDriver = async (req, res) => {
    try {
        const {id} = req.params;

        const connection = await getConnection();
        const [result] = await connection.query("SELECT * from drivers WHERE ID = ?", id);

        if (result.length > 0) return res.json(result[0]);
        res.status(404).json({
            success: false,
            message: "driver not found."
        });

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }    
};

const createDriver = async (req, res)=>{
    try {
        const {doc_id, document, name, position, license, 
            dep_id, address, location_id, phone, situation_id, observation, birth_year} = req.body;  
        const driver = {doc_id, document, name, position, license, 
            dep_id, address, location_id, phone, situation_id, observation, birth_year};
                       
        if (doc_id===undefined || document===undefined || name===undefined || position===undefined || license===undefined ||
            dep_id===undefined || location_id===undefined || phone===undefined || situation_id===undefined || observation===undefined ||
            birth_year===undefined){
            res.status(400).json({
                success: false,
                message: "bad resquest. Please fill all field."})
        };
        
        const connection = await getConnection();
        const [result] = await connection.query("INSERT INTO drivers SET ?", driver);
        
        if (result.affectedRows >= 1) return res.json({
            success: true,
            message: "driver added.",
            id: result.insertId
        });        
        res.json({
            success: false,
            message: "driver not created."
        });                 
        
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }  
};

const updateDriver = async (req, res)=>{
    try {
        const {id} = req.params;

        const {doc_id, document, name, position, license, 
            dep_id, address, location_id, phone, situation_id, observation, birth_year} = req.body;  
        const driver = {doc_id, document, name, position, license, 
            dep_id, address, location_id, phone, situation_id, observation, birth_year};
                       
        if (doc_id===undefined || document===undefined || name===undefined || position===undefined || license===undefined ||
            dep_id===undefined || location_id===undefined || phone===undefined || situation_id===undefined || observation===undefined ||
            birth_year===undefined){
            res.status(400).json({
                success: false,
                message: "bad resquest. Please fill all field."})
        };
        
        const connection = await getConnection();                
        const [result] = await connection.query("UPDATE drivers SET ? WHERE ID = ?", [driver, id]);

        if (result.affectedRows >= 1) return res.json({                
            success: true,
            message: "driver update.",
            id: id
        });        
        res.status(404).json({
            success: false,
            message: "driver not found."
        });  
         
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }   
};

const deleteDriver = async (req, res)=>{
    try {
        const {id} = req.params;
        const connection = await getConnection();
        const [result] = await connection.query("DELETE from drivers WHERE ID = ?", id);        
        
        if (result.affectedRows >= 1) return res.json({
            success: true,
            message: `driver with id:${id} delete.`
        });
        res.status(404).json({
            success: false,
            message: "driver not found."
        }); 

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }   
};

export const methods = {
    getDrivers,
    getDriver,
    createDriver,
    updateDriver,
    deleteDriver
};