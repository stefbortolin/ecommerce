import  conexion  from '../database/connection'

export const getCategories = async (req,res) => {
    await conexion.query("SELECT * FROM category", function(error,results,fields){
        res.json({"data": results});
    })
}
