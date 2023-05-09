import { pool } from "../db.js";

export const product = async (req,res) =>{
    const pro = await pool.query("SELECT * FROM producto WHERE id_producto = $1",[req.params.id])
    return res.json(pro.rows[0])
}

export const Send = async (req,res) =>{

    const fecha = new Date()
    const codi = 1563;
    const pro = await pool.query("INSERT INTO carrito(id_cliente,fecha_compra,total) VALUES($1,$2,$3)",[req.user.usuario,fecha.toLocaleDateString('en-US'),req.body.total])
    const idcarr= await pool.query("SELECT id_carrito FROM carrito ORDER BY id_carrito DESC LIMIT 1")
    req.body.orderItems.forEach(async element => {
        await pool.query("INSERT INTO detalle_carrito(id_carrito,id_producto,cantidad,precio) VALUES($1,$2,$3,$4)",[idcarr.rows[0].id_carrito,element.id_producto,element.cantidad,element.precio])
        await pool.query("INSERT INTO pago(id_carrito,fecha_pago,metodo,total) VALUES($1,$2,$3,$4)",[idcarr.rows[0].id_carrito,fecha.toLocaleDateString('en-US'),req.body.paymentMethod,req.body.total])
        const Estado = "En Proceso"
        await pool.query("INSERT INTO envio (id_carrito, direccion, ciudad, estado, pais, codigo_postal, fecha_envio)VALUES ($1,$2,$3,$4,$5,$6,$7);",[idcarr.rows[0].id_carrito,req.body.Direccion,req.body.Ciudad,Estado,req.body.Pais,codi,fecha.toLocaleDateString('en-US')])
        const Canti = await pool.query("SELECT * FROM inventario WHERE id_producto = $1",[element.id_producto])
        const calculo = Canti.rows[0].cantidad_disponible - element.cantidad
        if(calculo > 0){
            await pool.query("UPDATE inventario SET cantidad_disponible = $1 WHERE id_inventario = $2",[calculo,Canti.rows[0].id_inventario])
        }else{
            res.json({ ok: false, status: 200 , order:false})
        }
    });
    const Estado = "En Proceso"
    const Env = await pool.query("INSERT INTO envio(id_carrito,direccion,ciudad,estado,pais,codigo_postal,fecha_envio) VALUES($1,$2,$3,$4,$5,$6,$7)",[idcarr.rows[0].id_carrito,req.body.Direccion,req.body.Ciudad,Estado,req.body.Pais,codi,fecha.toLocaleDateString('en-US')])
    res.json({ ok: true, status: 200 , order:true})    
}