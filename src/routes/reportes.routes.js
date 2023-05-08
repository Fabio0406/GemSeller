import { Router } from "express";
import { 
    renderVistaReportes,
    generarPDF
} from "../controllers/reportes.controller.js";

import { 
    logeado,
    logeadoA
} from "../lib/privado.js";
const reportes = Router();


reportes.get('/reportes', logeadoA, renderVistaReportes); 
reportes.get('/getreportepdf/:valor', logeadoA, generarPDF);
export default reportes;