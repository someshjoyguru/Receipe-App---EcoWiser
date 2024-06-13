import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {updateRecipe, deleteRecipe, showRecipes, createRecipe} from "../controllers/recipe.js";

const router = express.Router();

router.get("/", isAuthenticated, showRecipes);
router.post("/new", isAuthenticated, createRecipe);
router.post("/edit", isAuthenticated, updateRecipe);
router.delete("/:id", isAuthenticated, deleteRecipe);

export default router;