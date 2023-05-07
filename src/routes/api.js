import { Router } from "express";

import { product } from "../controllers/api.CO.js";

const api = Router();

api.get("/product/:id", product);
//api.post("/checkout", controller.checkout);

export default api;