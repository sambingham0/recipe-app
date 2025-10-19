import { Request, Response } from 'express';
import Recipe from '../models/recipe';
import mongoose from 'mongoose';

// GET all recipes
export const getAllRecipes = async (req: Request, res: Response) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET recipe by ID
export const getRecipeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid recipe ID' });
    }

    const recipe = await Recipe.findById(id);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });

    res.json(recipe);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// POST new recipe
export const createRecipe = async (req: Request, res: Response) => {
  try {
    const { title, description, ingredients, instructions, prepTime, cookTime, difficulty } = req.body;

    // Validation
    if (
      !title ||
      !Array.isArray(ingredients) ||
      !Array.isArray(instructions) ||
      typeof prepTime !== 'number' ||
      typeof cookTime !== 'number' ||
      !['Easy', 'Medium', 'Hard'].includes(difficulty)
    ) {
      return res.status(400).json({ message: 'Invalid or missing fields' });
    }

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
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// PUT update recipe
export const updateRecipe = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, ingredients, instructions, prepTime, cookTime, difficulty } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid recipe ID' });
    }

    // Validation
    if (
      !title ||
      !Array.isArray(ingredients) ||
      !Array.isArray(instructions) ||
      typeof prepTime !== 'number' ||
      typeof cookTime !== 'number' ||
      !['Easy', 'Medium', 'Hard'].includes(difficulty)
    ) {
      return res.status(400).json({ message: 'Invalid or missing fields' });
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      id,
      { title, description, ingredients, instructions, prepTime, cookTime, difficulty },
      { new: true, runValidators: true }
    );

    if (!updatedRecipe) return res.status(404).json({ message: 'Recipe not found' });

    res.json(updatedRecipe);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE recipe
export const deleteRecipe = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid recipe ID' });
    }

    const deletedRecipe = await Recipe.findByIdAndDelete(id);
    if (!deletedRecipe) return res.status(404).json({ message: 'Recipe not found' });

    res.json({ message: 'Recipe deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
