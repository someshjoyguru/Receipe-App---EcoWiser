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
        const { heading, description, recipeImage, userName } = req.body;
        const user_id = req.user._id;
        const recipe = await Recipe.create({heading, description, user:user_id, userName, recipeImage });
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
        const { _id } = req.body;
        const existingRecipe = await Recipe.findById(_id);
        if (!existingRecipe) {
            return res.status(404).json({
                success: false,
                message: "Recipe not found",
            });
        }

        existingRecipe.heading = req.body.heading;
        existingRecipe.description = req.body.description;
        existingRecipe.recipeImage = req.body.recipeImage;
        existingRecipe.updatedAt = new Date();

        await existingRecipe.save();

        res.status(200).json({
            success: true,
            recipe: existingRecipe,
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
        next(error);
    }
};


export const deleteRecipe = async (req, res, next) => {
    try {
        const { id } = req.params;
        const recipe = await Recipe.findByIdAndDelete(id);

        if (!recipe) {
            return res.status(404).json({
                success: false,
                message: "Recipe not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Recipe deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};