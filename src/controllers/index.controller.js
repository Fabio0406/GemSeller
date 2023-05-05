import { pool } from "../db.js";
import passport from 'passport';

export const slash = (req, res) => {
  res.render('index.ejs', { Imagen: "images/logo2.jpg"});
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
