import { z } from 'zod';
import mongoose from 'mongoose';

export const recipeIdParamSchema = z.object({
  id: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: 'Invalid recipe ID',
  }),
});

export const recipeBodySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  ingredients: z.array(z.string().min(1)).min(1, 'At least one ingredient'),
  instructions: z.array(z.string().min(1)).min(1, 'At least one instruction'),
  prepTime: z.number().int().nonnegative(),
  cookTime: z.number().int().nonnegative(),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']),
});

export const recipeUpdateBodySchema = recipeBodySchema;