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
  const prod = await pool.query("SELECT producto.nombre,producto.precio,producto.descripcion,inventario.cantidad_disponible,categoria.nombre as categoriaN FROM producto,inventario,categoria where inventario.id_producto = producto.id_producto and producto.id_categoria = categoria.id_categoria")
  const CantP = prod.rowCount
  const DcatP = prod.rows
  
  console.log(DcatP)
  
    res.render('FormProducto',{Cant,Dcat,CantP,DcatP})
}

export const Fcate = async(req,res) => {
    const cat = await pool.query("SELECT * FROM categoria")
  const Cant = cat.rowCount
  const Dcat = cat.rows
    res.render('categorias',{Cant,Dcat})
}


export const FSend = async(req,res) => {
    const {nombre, precio, descripcion, categoria} = req.body
    const imagen = req.file.filename
    await pool.query("INSERT INTO producto (nombre, precio, descripcion, id_categoria, imagen)VALUES ($1,$2,$3,$4,$5)",[nombre, precio, descripcion, categoria,imagen])
    res.redirect('/')
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
