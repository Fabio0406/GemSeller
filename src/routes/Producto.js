import { Router } from "express";
import { logeado, logeadoA, logeadoE, logeadoO, logeadoP} from "../lib/privado.js";

import { DeleteC, DeleteP, FSend, Fcate, Fprod, RMprod, Render1, Render2, Render3, Render4, Render5, Render6} from "../controllers/usuario.controler.js";
import {dirname, join} from 'path';
import {fileURLToPath} from 'url';
import multer from 'multer';

const __dirname = dirname(fileURLToPath(import.meta.url));
export const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, join(__dirname,'../public/images'))
    },
    filename: (req,file,cb) =>{
        const ext = file.originalname.split('.').pop()
        cb(null,`${Date.now()}.${ext}`)
    }
})

const prod = Router();
const upload = multer({storage})
prod.get('/formP', logeadoA, Fprod)
prod.post('/DeleteP', logeadoA, DeleteP)
prod.post('/Mprod', logeadoA, RMprod)
prod.post('/Mcate', logeadoA, DeleteP)
prod.get('/formC', logeadoA, Fcate)
prod.post('/DeleteC', logeadoA, DeleteC)
prod.post('/formP', upload.single("img"), FSend)
prod.get('/Pulseras',Render1)
prod.get('/Anillos',Render2)
prod.get('/Aretes',Render3)
prod.get('/Relojes',Render4)
prod.get('/Collares y colgantes',Render5)
prod.get('/Broches',Render6)


export default prod;