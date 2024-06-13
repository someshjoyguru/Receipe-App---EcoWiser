import { Recipe } from "../models/recipe.js";

export const showRecipes = async (req, res, next) => {
    try {
        const recipes = await Recipe.find().sort({
            createdAt: -1,
        });

        res.status(200).json({
            success: true,
            recipes,
        });
    } catch (error) {
        next(error);
    }
}

export const createRecipe = async (req, res, next) => {
    try {
        const { heading, description, recipeImage } = req.body;
        const user_id = req.user._id;
        const recipe = await Recipe.create({heading, description, user:user_id, recipeImage });
        res.status(201).json({
            success: true,
            heading: recipe.heading,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
}

export const updateRecipe = async (req, res, next) => {
    try {
        const existingRecipe = await Recipe.findById(req.body._id);
        existingRecipe.set(req.body);
        await existingRecipe.save();
        res.status(200).json({
            success: true,
            recipe: existingRecipe,
        });
    } catch (error) {
        next(error);
    }
}

export const deleteRecipe = async (req, res, next) => {
    try {
        const { _id } = req.body;
        await Recipe.findByIdAndDelete(_id);
        res.status(200).json({
            success: true,
        });
    } catch (error) {
        next(error);
    }
}