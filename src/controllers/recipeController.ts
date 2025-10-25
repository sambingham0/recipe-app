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

    const recipe = await Recipe.create({
      title,
      description,
      ingredients,
      instructions,
      prepTime,
      cookTime,
      difficulty,
      createdBy: null, // no auth yet
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

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      id,
      { title, description, ingredients, instructions, prepTime, cookTime, difficulty },
      { new: true, runValidators: true }
    );

    if (!updatedRecipe) throw new AppError(404, 'Recipe not found', 'RECIPE_NOT_FOUND');

    res.json(updatedRecipe);
  } catch (err) {
    next(err);
  }
};

// DELETE recipe
export const deleteRecipe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const deletedRecipe = await Recipe.findByIdAndDelete(id);
    if (!deletedRecipe) throw new AppError(404, 'Recipe not found', 'RECIPE_NOT_FOUND');
    res.json({ message: 'Recipe deleted successfully' });
  } catch (err) {
    next(err);
  }
};
