import {getConnection} from "../database/database"

const getLocations = async (req, res) => {
    try {
        const connection = await getConnection();
        const [result] = await connection.query("SELECT * from locations");        
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }    
};
const getLocation = async (req, res) => {
    try {
        const {id} = req.params;

        const connection = await getConnection();
        const [result] = await connection.query("SELECT * from locations WHERE location_id = ?", id);
                
        if (result.length > 0) return res.json(result[0]);
        res.status(404).json({
            success: false,
            message: "location not found."
        }); 

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }    
};

const createLocation = async (req, res)=>{
    try {
        const {descrip, district_id, cod_postal, prov_id} = req.body;  

        if (descrip===undefined || district_id===undefined || cod_postal===undefined || prov_id===undefined){
            res.status(400).json({
                success: false,
                message: "bad resquest. Please fill all field."})
        };
        const location = {descrip, district_id, cod_postal, prov_id};

        const connection = await getConnection();
        const [result] = await connection.query("INSERT INTO locations SET ?", location);
        
        if (result.affectedRows >= 1) return res.json({
            success: true,
            message: "location added.",
            id: result.insertId
        });        
        res.json({
            success: false,
            message: "location not created."
        });   
        
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }  
};

const updateLocation = async (req, res)=>{
    try {
        const {id} = req.params;
        const {descrip, district_id, cod_postal, prov_id} = req.body; 

        if (descrip===undefined || district_id===undefined || cod_postal===undefined || prov_id===undefined){
            res.status(400).json({
                success: false,
                message: "bad resquest. Please fill all field."})
        };

        const location = {descrip, district_id, cod_postal, prov_id};

        const connection = await getConnection();                
        const [result] = await connection.query("UPDATE locations SET ? WHERE location_id = ?", [location, id]);
     
        if (result.affectedRows >= 1) return res.json({                
            success: true,
            message: "location update.",
            id: id
        });        
        res.status(404).json({
            success: false,
            message: "location not found."
        }); 

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }   
};

const deleteLocation = async (req, res)=>{
    try {
        const {id} = req.params;

        const connection = await getConnection();
        const [result] = await connection.query("DELETE from locations WHERE location_id = ?", id);        

        if (result.affectedRows >= 1) return res.json({
            success: true,
            message: `location with id:${id} delete.`
        });
        res.status(404).json({
            success: false,
            message: "location not found."
        });

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }   
};

export const methods = {
    getLocations,
    getLocation,
    createLocation,
    updateLocation,
    deleteLocation
};