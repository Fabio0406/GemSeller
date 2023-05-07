import { pool } from "../db.js";

export const product = async (req,res) =>{
    const pro = await pool.query("SELECT * FROM producto WHERE id_producto = $1",[req.params.id])
    return res.json(pro.rows[0])
}