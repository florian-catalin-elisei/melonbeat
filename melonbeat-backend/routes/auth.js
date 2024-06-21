import { login } from "../controllers/login.js";
import { register } from "../controllers/register.js";
import express from "express";

const router = express.Router();
router.post("/login", login);
router.post("/register", register);

export default router;
