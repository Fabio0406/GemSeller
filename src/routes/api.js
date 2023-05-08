import { Router } from "express";

import { Send, product } from "../controllers/api.CO.js";

const api = Router();

api.get("/product/:id", product);
api.post("/checkout", Send);

export default api;