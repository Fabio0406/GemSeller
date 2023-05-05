import { Router } from "express";
import { insertarUsuario, 
    addUser, 
    entrarHome,
    InsertarServi, 
    EliminarServi, 
    ModificarServi,
    entrarservicio, 
    listado, 
    Mservicio, 
    entrarGodonto, 
    ListarOdonto, 
    Renderform, 
    entrarGpaciente, 
    Listarpaciente, 
    RenderformP, 
    InsertarOdonto, 
    InsertarPaciente, 
    EliminarOdonto, 
    EliminarPaciente, 
    ModificarOdonto, 
    Modonto, 
    ModificarPaciente,
    Mpaciente, 
    buscarPacientes,
    buscarOdontologos,
    EntrarBitacora,
    entrar,
    EntrarHis,
    buscarHPacientes,
    Historia,
    ModiCuest,
    Histrata,
    showHA,
    showH
} from "../controllers/usuario.controler.js";


import { logeado, logeadoA, logeadoE, logeadoO, logeadoP} from "../lib/privado.js";

const router = Router();

router.get('/homeA',logeadoA,showHA)

router.get('/home',logeado,showH)

router.get("/form", insertarUsuario);
router.post('/form', addUser);






export default router;
