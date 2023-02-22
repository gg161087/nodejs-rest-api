import {getConnection} from "../database/database"

const getCountries = async (req, res) => {
    try {
        const connection = await getConnection();
        const [result] = await connection.query("SELECT * from countries");        
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }    
};
const getCountry = async (req, res) => {
    try {
        const {id} = req.params;

        const connection = await getConnection();
        const [result] = await connection.query("SELECT * from countries WHERE country_id = ?", id); 
        
        if (result.length > 0) return res.json(result[0]);
        res.status(404).json({
            success: false,
            message: "country not found."
        });

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }    
};

const createCountry = async (req, res)=>{
    try {
        const descrip = req.body;  

        if (descrip === undefined){
            res.status(400).json({
                success: false,
                message: "bad resquest. Please fill all field."})
        };

        const connection = await getConnection();
        const [result] = await connection.query("INSERT INTO countries SET ?", descrip);
        
        if (result.affectedRows >= 1) return res.json({
            success: true,
            message: "country added.",
            id: result.insertId
        });        
        res.json({
            success: false,
            message: "country not created."
        });     
        
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }  
};

const updateCountry = async (req, res)=>{
    try {
        const {id} = req.params;
        const descrip = req.body;

        if (descrip === undefined){
            res.status(400).json({
                success: false,
                message: "bad resquest. Please fill all field."})
        };
        
        const connection = await getConnection();                
        const [result] = await connection.query("UPDATE countries SET ? WHERE country_id = ?", [descrip, id]);

        if (result.affectedRows >= 1) return res.json({                
            success: true,
            message: "country update.",
            id: id
        });        
        res.status(404).json({
            success: false,
            message: "country not found."
        });

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }   
};

const deleteCountry = async (req, res)=>{
    try {
        const {id} = req.params;

        const connection = await getConnection();
        const [result] = await connection.query("DELETE from countries WHERE country_id = ?", id);

        if (result.affectedRows >= 1) return res.json({
            success: true,
            message: `country with id:${id} delete.`
        });
        res.status(404).json({
            success: false,
            message: "country not found."
        });  

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }   
};

export const methods = {
    getCountries,
    getCountry,
    createCountry,
    updateCountry,
    deleteCountry
};