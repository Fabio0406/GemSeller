import { pool } from "../db.js";
import passport from 'passport';
import Listar from "../lib/mostrar.js";

export const slash = async (req, res) => {
  const producto = await pool.query("SELECT * FROM producto")
  const Cant = producto.rowCount
  const DPro = producto.rows

  const Cate = await pool.query("SELECT * FROM categoria")
  const CantC = Cate.rowCount
  const DCate = Cate.rows
  res.render('index.ejs', { Imagen: "images/logo2.jpg" , Cant , DPro, CantC,DCate });
};

//para mostrar los imputs de login
export const showLogin = (req, res) => {
  res.render('Login.ejs',{ titulo: "Wellcome"});
};

//para iniciar sesion
export const sendData = passport.authenticate('local.login', {
  successRedirect: '/homeA', //perfil
  failureRedirect: '/login',
  failureFlash: true
});

//para cerrar sesion
export const cerrarSesion = async(req, res) => {
  req.logOut(async(err) => {
    if (err) { 
      return next(err); 
    }    
    res.redirect('/');
  });
};
