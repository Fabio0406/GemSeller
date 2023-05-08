import { Router } from "express";
import { insertarUsuario, 
    addUser, 
    
    showHA,
    showH,
    addAdmin,
    insertarAdmin
} from "../controllers/usuario.controler.js";


import { logeado, logeadoA, logeadoE, logeadoO, logeadoP} from "../lib/privado.js";

const router = Router();

router.get('/homeA',logeadoA,showHA)

router.get('/home',logeado,showH)

router.get("/form", insertarUsuario);
router.post('/form', addUser);
router.get('/formAd', insertarAdmin);
router.post('/formAd', addAdmin);






export default router;
