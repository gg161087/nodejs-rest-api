import {getConnection} from "../database/database"

const getSituations = async (req, res) => {
    try {
        const connection = await getConnection();
        const [result] = await connection.query("SELECT * from situations");        
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }    
};
const getSituation = async (req, res) => {
    try {
        const {id} = req.params;

        const connection = await getConnection();
        const [result] = await connection.query("SELECT * from situations WHERE situation_id = ?", id); 
        
        if (result.length > 0) return res.json(result[0]);
        res.status(404).json({
            success: false,
            message: "situation not found."
        });  

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }    
};

const createSituation = async (req, res)=>{
    try {
        const descrip = req.body;  

        if ( descrip === undefined){
            res.status(400).json({
                success: false,
                message: "bad resquest. Please fill all field."});
        }
        const connection = await getConnection();
        const [result] = await connection.query("INSERT INTO situations SET ?", descrip);

        if (result.affectedRows >= 1) return res.json({
            success: true,
            message: "Situacion added.",
            id: result.insertId
        });        
        res.json({
            success: false,
            message: "Situacion not created.",                
        });
        
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }  
};

const updateSituation = async (req, res)=>{
    try {
        const {id} = req.params;
        const descrip = req.body;

        if ( descrip === undefined || id === undefined){
            res.status(400).json({
                succes: false,
                message: "bad resquest. Please fill all field."})
        }

        const connection = await getConnection();                
        const [result] = await connection.query("UPDATE situations SET ? WHERE situation_id = ?", [descrip, id]);
        
        if (result.affectedRows >= 1) return res.json({
            success: true,
            message: "stituation update.",
            id: id
        });        
        res.status(404).json({
            success: false,
            message: "situation not found."
        });        
         
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }   
};

const deleteSituation = async (req, res)=>{
    try {
        const {id} = req.params;

        const connection = await getConnection();
        const [result] = await connection.query("DELETE from situations WHERE situation_id = ?", id);
        
        if (result.affectedRows >= 1) return res.json({
            success: true,
            message: `situation with id:${id} delete.`
        });        
        res.status(404).json({
            success: false,
            message: "situation not found."
        });
         
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }   
};

export const methods = {
    getSituations,
    getSituation,
    createSituation,
    updateSituation,
    deleteSituation
};