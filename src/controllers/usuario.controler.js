import { pool } from "../db.js";

import helprs from "../lib/helpers.js"


export const showHA = async (req, res) => {    
    const producto = await pool.query("SELECT * FROM producto")
  const Cant = producto.rowCount
  const DPro = producto.rows

  const Cate = await pool.query("SELECT * FROM categoria")
  const CantC = Cate.rowCount
  const DCate = Cate.rows
    res.render('index',{ Imagen: "images/Logo2.jpg",CantC,DCate,Cant,DPro });
};


export const Fprod = async(req,res) => {
    const cat = await pool.query("SELECT * FROM categoria")
  const Cant = cat.rowCount
  const Dcat = cat.rows
  const prod = await pool.query("SELECT producto.id_producto,producto.nombre,producto.precio,producto.descripcion,inventario.cantidad_disponible,categoria.nombre as categoriaN FROM producto,inventario,categoria where inventario.id_producto = producto.id_producto and producto.id_categoria = categoria.id_categoria")
  const CantP = prod.rowCount
  const DcatP = prod.rows
  
  console.log(DcatP)
  
    res.render('FormProducto',{Cant,Dcat,CantP,DcatP})
}

export const DeleteP = async(req,res) => {
    await pool.query("DELETE FROM producto WHERE id_producto = $1",[req.body.id_producto])  
    res.redirect('/formP')
}

export const RMprod = async(req,res) => {
    const DatosP =await pool.query("Select * from producto, inventario where producto.id_producto = $1 and producto.id_producto = inventario.id_producto",[req.body.id_producto])  
    const cat = await pool.query("SELECT * FROM categoria")
  const Cant = cat.rowCount
  const Dcat = cat.rows
    res.render('Mprodu',{datos: DatosP.rows, Cant,Dcat})
}

export const Fcate = async(req,res) => {
    const cat = await pool.query("SELECT * FROM categoria")
  const Cant = cat.rowCount
  const Dcat = cat.rows
    res.render('categorias',{Cant,Dcat})
}

export const DeleteC = async(req,res) => {
    await pool.query("DELETE FROM categoria WHERE id_categoria = $1",[req.body.id_categoria])  
    res.redirect('/formC')
}


export const FSend = async(req,res) => {
    const {nombre, precio, descripcion, categoria,Cantidad} = req.body
    console.log(req)
    const imagen = req.file.filename
    await pool.query("INSERT INTO producto (nombre, precio, descripcion, id_categoria, imagen)VALUES ($1,$2,$3,$4,$5)",[nombre, precio, descripcion, categoria,imagen])
    const idcarr= await pool.query("SELECT id_producto FROM producto ORDER BY id_producto DESC LIMIT 1")
    await pool.query("INSERT INTO inventario(id_producto,cantidad_disponible) Values($1,$2)",[idcarr.rows[0].id_producto,Cantidad])
    res.redirect('/homeA')
}

export const Render1 = async(req,res) => {
    const producto = await pool.query("SELECT * FROM producto where id_categoria = 1")
    const Cant = producto.rowCount
    const DPro = producto.rows
    const Cate = await pool.query("SELECT * FROM categoria")
    const CantC = Cate.rowCount
    const DCate = Cate.rows    
    res.render('index',{ Imagen: "images/Logo2.jpg",CantC,DCate,Cant,DPro })
}

export const Render2 = async(req,res) => {
    const producto = await pool.query("SELECT * FROM producto where id_categoria = 2")
    const Cant = producto.rowCount
    const DPro = producto.rows
    const Cate = await pool.query("SELECT * FROM categoria")
    const CantC = Cate.rowCount
    const DCate = Cate.rows    
    res.render('index',{ Imagen: "images/Logo2.jpg",CantC,DCate,Cant,DPro })
}

export const Render3 = async(req,res) => {
    const producto = await pool.query("SELECT * FROM producto where id_categoria = 3")
    const Cant = producto.rowCount
    const DPro = producto.rows
    const Cate = await pool.query("SELECT * FROM categoria")
    const CantC = Cate.rowCount
    const DCate = Cate.rows    
    res.render('index',{ Imagen: "images/Logo2.jpg",CantC,DCate,Cant,DPro })
}
export const Render4 = async(req,res) => {
    const producto = await pool.query("SELECT * FROM producto where id_categoria = 4")
    const Cant = producto.rowCount
    const DPro = producto.rows
    const Cate = await pool.query("SELECT * FROM categoria")
    const CantC = Cate.rowCount
    const DCate = Cate.rows    
    res.render('index',{ Imagen: "images/Logo2.jpg",CantC,DCate,Cant,DPro })
}
export const Render5 = async(req,res) => {
    const producto = await pool.query("SELECT * FROM producto where id_categoria = 5")
    const Cant = producto.rowCount
    const DPro = producto.rows
    const Cate = await pool.query("SELECT * FROM categoria")
    const CantC = Cate.rowCount
    const DCate = Cate.rows    
    res.render('index',{ Imagen: "images/Logo2.jpg",CantC,DCate,Cant,DPro })
}
export const Render6 = async(req,res) => {
    const producto = await pool.query("SELECT * FROM producto where id_categoria = 6")
    const Cant = producto.rowCount
    const DPro = producto.rows
    const Cate = await pool.query("SELECT * FROM categoria")
    const CantC = Cate.rowCount
    const DCate = Cate.rows    
    res.render('index',{ Imagen: "images/Logo2.jpg",CantC,DCate,Cant,DPro })
}




export const showH = async (req, res) => {  
    const producto = await pool.query("SELECT * FROM producto")
  const Cant = producto.rowCount
  const DPro = producto.rows

  const Cate = await pool.query("SELECT * FROM categoria")
  const CantC = Cate.rowCount
  const DCate = Cate.rows
  
    res.render('index',{ Imagen: "images/Logo2.jpg"  ,CantC,DCate,Cant,DPro });
};
export const insertarUsuario = async (req, res) => {    
    res.render('formulario');
};

export const insertarAdmin = async (req, res) => {    
    res.render('formAd');
};

export const addUser = async (req,res) => {
    try {
        const idRol = 2;        
        const {Usuario, nombre, correo_electronico, contrasena, direccion, telefono} = req.body; // obtengo todos los datps desde el formulario
        const Ncontrasena = await helprs.encriptar(contrasena); // encripto la contraseña
        const e = await pool.query('INSERT INTO cliente (Usuario, nombre, correo_electronico, contrasena, direccion, telefono, idRol) VALUES($1,$2,$3,$4,$5,$6,$7)', [Usuario, nombre, correo_electronico, Ncontrasena, direccion, telefono, idRol]);// inserto el usuario
        res.redirect('/login')
    } catch (e) {
        return res.redirect('/form')      
        
    }
}

export const addAdmin = async (req,res) => {
    try {
        const idRol = 1;        
        const {Usuario, nombre, correo_electronico, contrasena, direccion, telefono} = req.body; // obtengo todos los datps desde el formulario
        const Ncontrasena = await helprs.encriptar(contrasena); // encripto la contraseña
        const e = await pool.query('INSERT INTO cliente (Usuario, nombre, correo_electronico, contrasena, direccion, telefono, idRol) VALUES($1,$2,$3,$4,$5,$6,$7)', [Usuario, nombre, correo_electronico, Ncontrasena, direccion, telefono, idRol]);// inserto el usuario
        res.redirect('/login')
    } catch (e) {
        return res.redirect('/form')      
        
    }
}
