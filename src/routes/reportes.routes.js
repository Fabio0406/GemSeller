import { Router } from "express";
import { 
    renderVistaReportes,
    generarPDF
} from "../controllers/reportes.controller.js";

import { 
    logeado,
    logeadoA
} from "../lib/privado.js";
const router = Router();


router.get('/reportes', logeado, renderVistaReportes); 
router.get('/getreportepdf/:valor', logeado, generarPDF);
export default router;