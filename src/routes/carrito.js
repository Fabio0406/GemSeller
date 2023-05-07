import { Router } from "express";
import { logeado, logeadoA, logeadoE, logeadoO, logeadoP} from "../lib/privado.js";
import { RedCarrito } from "../controllers/carrito.js";
const carrito = Router();

carrito.get('/Mycarrito',logeado,RedCarrito)

export default carrito;