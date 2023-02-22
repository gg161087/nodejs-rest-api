import {getConnection} from "../database/database"

const getProvinces = async (req, res) => {
    try {
        const connection = await getConnection();
        const [result] = await connection.query("SELECT * from provinces");        
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }    
};
const getProvince = async (req, res) => {
    try {
        const {id} = req.params;

        const connection = await getConnection();
        const [result] = await connection.query("SELECT * from provinces WHERE prov_id = ?", id); 

        if (result.length > 0) return res.json(result[0]);
        res.status(404).json({
            success: false,
            message: "province not found."
        });

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }    
};

const createProvince = async (req, res)=>{
    try {
        const {country_id, prov_desc} = req.body;  

        if ( country_id === undefined || prov_desc === undefined){
            res.status(400).json({
                success: false,
                message: "bad resquest. Please fill all field."})
        };
        const province = {country_id, prov_desc};

        const connection = await getConnection();
        const [result] = await connection.query("INSERT INTO provinces SET ?", province);
                
        if (result.affectedRows >= 1) return res.json({
            success: true,
            message: "province added.",
            id: result.insertId
        });        
        res.json({
            success: false,
            message: "province not created."
        });  
        
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }  
};

const updateProvince = async (req, res)=>{
    try {
        const {id} = req.params;
        const {country_id, prov_desc} = req.body;

        if (country_id === undefined || prov_desc === undefined || id === undefined){
            res.status(400).json({
                success: false,
                message: "bad resquest. Please fill all field."})
        };

        const province = {country_id, prov_desc};

        const connection = await getConnection();                
        const [result] = await connection.query("UPDATE provinces SET ? WHERE prov_id = ?", [province, id]);

        if (result.affectedRows >= 1) return res.json({                
            success: true,
            message: "province update.",
            id: id
        });        
        res.status(404).json({
            success: false,
            message: "province not found."
        });

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }   
};

const deleteProvince = async (req, res)=>{
    try {
        const {id} = req.params;

        const connection = await getConnection();
        const [result] = await connection.query("DELETE from provinces WHERE prov_id = ?", id);

        if (result.affectedRows >= 1) return res.json({
            success: true,
            message: `province with id:${id} delete.`
        });
        res.status(404).json({
            success: false,
            message: "province not found."
        });

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }  
};

export const methods = {
    getProvinces,
    getProvince,
    createProvince,
    updateProvince,
    deleteProvince
};