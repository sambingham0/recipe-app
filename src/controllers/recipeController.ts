import { Request, Response, NextFunction } from 'express';
import Recipe from '../models/recipe';
import AppError from '../utils/AppError';

// GET all recipes
export const getAllRecipes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    next(err);
  }
};

// GET recipe by ID
export const getRecipeById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findById(id);
    if (!recipe) throw new AppError(404, 'Recipe not found', 'RECIPE_NOT_FOUND');
    res.json(recipe);
  } catch (err) {
    next(err);
  }
};

// POST new recipe
export const createRecipe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, ingredients, instructions, prepTime, cookTime, difficulty } = req.body;

    // req.user is populated by Passport after authentication
    const user = req.user as any;
    if (!user) throw new AppError(401, 'Authentication required', 'AUTH_REQUIRED');

    const recipe = await Recipe.create({
      title,
      description,
      ingredients,
      instructions,
      prepTime,
      cookTime,
      difficulty,
      createdBy: user._id,
    });

    res.status(201).json(recipe);
  } catch (err) {
    next(err);
  }
};

// PUT update recipe
export const updateRecipe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { title, description, ingredients, instructions, prepTime, cookTime, difficulty } = req.body;

    const recipe = await Recipe.findById(id);
    if (!recipe) throw new AppError(404, 'Recipe not found', 'RECIPE_NOT_FOUND');

    // Only the creator can update
    const user = req.user as any;
    if (!user) throw new AppError(401, 'Authentication required', 'AUTH_REQUIRED');
    if (!recipe.createdBy || recipe.createdBy.toString() !== user._id.toString()) {
      throw new AppError(403, 'Forbidden - not the owner', 'FORBIDDEN');
    }

    recipe.title = title;
    recipe.description = description;
    recipe.ingredients = ingredients;
    recipe.instructions = instructions;
    recipe.prepTime = prepTime;
    recipe.cookTime = cookTime;
    recipe.difficulty = difficulty as any;

    await recipe.save();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

// DELETE recipe
export const deleteRecipe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findById(id);
    if (!recipe) throw new AppError(404, 'Recipe not found', 'RECIPE_NOT_FOUND');

    const user = req.user as any;
    if (!user) throw new AppError(401, 'Authentication required', 'AUTH_REQUIRED');
    if (!recipe.createdBy || recipe.createdBy.toString() !== user._id.toString()) {
      throw new AppError(403, 'Forbidden - not the owner', 'FORBIDDEN');
    }

    await recipe.deleteOne();
    res.json({ message: 'Recipe deleted successfully' });
  } catch (err) {
    next(err);
  }
};
