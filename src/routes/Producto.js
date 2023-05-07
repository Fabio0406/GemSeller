import { Router } from "express";
import { logeado, logeadoA, logeadoE, logeadoO, logeadoP} from "../lib/privado.js";

import { FSend, Fprod} from "../controllers/usuario.controler.js";
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
prod.post('/formP', upload.single("img"), FSend)


export default prod;