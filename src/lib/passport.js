import passport from 'passport';
import Strategy from 'passport-local';
import { pool } from "../db.js";
import helprs from './helpers.js'
import busqueda  from "./busquedas.js";

//para iniciar sesion
passport.use('local.login', new Strategy.Strategy({
    usernameField: 'Usuario',
    passwordField: 'contrasena',
    passReqToCallback: true
}, async (req, Usuario, contrasena, done) => {
    try {
        const rows = await busqueda.Usuario(Usuario)// consulta que nos ayuda a saber si el usuario existe
        if (rows.rowCount > 0) { // ¿existe algun Usuario?            
            const P = rows.rows[0]
            const Validar = await helprs.descriptar(contrasena, P.contrasena);// verificamos su contraseña
            if (Validar) {// ¿contraseña correcta?                
                done(null, P, req.flash('aprobado', 'Bienvenido' + Usuario)) // mando los datos a las variables globales y mando un mensaje de exito
            } else {
                done(null, false, req.flash('denegado', 'contraseña incorrecta'))
            }
        } else {
            return done(null, false, req.flash('denegado', 'usuario no existe'))
        }
    } catch {
        return done(null, false, req.flash('denegado', 'usuario no existe, error'))
    }
}))



passport.serializeUser((user, done) => {
    done(null, user);// mando los datos a las variables globales
});

passport.deserializeUser(async (user, done) => {
    try {  
        const rows = await busqueda.Usuario(user.usuario)// consulta que nos ayuda a saber si el usuario existe      
        done(null, user); // mando los datos a las variables globales
    } catch (e) {
        console.log(e)
    }
});
