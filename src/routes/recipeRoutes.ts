import { Router } from 'express';
import { validate } from '../middleware/validate';
import { recipeBodySchema, recipeIdParamSchema, recipeUpdateBodySchema } from '../validation/recipeSchemas';
import {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe
} from '../controllers/recipeController';

const router = Router();

router.get(
  '/',
  /* #swagger.tags = ['Recipes'] */
  /* #swagger.summary = 'Get all recipes' */
  /* #swagger.responses[200] = { description: 'List of recipes', schema: [{ $ref: '#/definitions/Recipe' }] } */
  /* #swagger.responses[500] = { description: 'Server error', schema: { $ref: '#/definitions/ErrorResponse' } } */
  getAllRecipes
);

router.get(
  '/:id',
  validate({ params: recipeIdParamSchema }),
  /* #swagger.tags = ['Recipes'] */
  /* #swagger.summary = 'Get a recipe by ID' */
  /* #swagger.parameters['id'] = { in: 'path', description: 'Recipe ID', required: true, type: 'string' } */
  /* #swagger.responses[200] = { description: 'Recipe', schema: { $ref: '#/definitions/Recipe' } } */
  /* #swagger.responses[400] = { description: 'Invalid ID', schema: { $ref: '#/definitions/ErrorResponse' } } */
  /* #swagger.responses[404] = { description: 'Not found', schema: { $ref: '#/definitions/ErrorResponse' } } */
  /* #swagger.responses[500] = { description: 'Server error', schema: { $ref: '#/definitions/ErrorResponse' } } */
  getRecipeById
);

router.post(
  '/',
  validate({ body: recipeBodySchema }),
  /* #swagger.tags = ['Recipes'] */
  /* #swagger.summary = 'Create a new recipe' */
  /* #swagger.parameters['body'] = { in: 'body', required: true, schema: { $ref: '#/definitions/RecipeInput' } } */
  /* #swagger.requestBody = {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/RecipeInput' }
          }
        }
     }
  */
  /* #swagger.responses[201] = { description: 'Created recipe', schema: { $ref: '#/definitions/Recipe' } } */
  /* #swagger.responses[400] = { description: 'Invalid or missing fields', schema: { $ref: '#/definitions/ErrorResponse' } } */
  /* #swagger.responses[500] = { description: 'Server error', schema: { $ref: '#/definitions/ErrorResponse' } } */
  createRecipe
);

router.put(
  '/:id',
  validate({ params: recipeIdParamSchema, body: recipeUpdateBodySchema }),
  /* #swagger.tags = ['Recipes'] */
  /* #swagger.summary = 'Update a recipe by ID' */
  /* #swagger.parameters['id'] = { in: 'path', description: 'Recipe ID', required: true, type: 'string' } */
  /* #swagger.parameters['body'] = { in: 'body', required: true, schema: { $ref: '#/definitions/RecipeInput' } } */
  /* #swagger.requestBody = {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/RecipeInput' }
          }
        }
     }
  */
  /* #swagger.responses[204] = { description: 'No Content - recipe updated successfully' } */
  /* #swagger.responses[400] = { description: 'Invalid ID or body', schema: { $ref: '#/definitions/ErrorResponse' } } */
  /* #swagger.responses[404] = { description: 'Not found', schema: { $ref: '#/definitions/ErrorResponse' } } */
  /* #swagger.responses[500] = { description: 'Server error', schema: { $ref: '#/definitions/ErrorResponse' } } */
  updateRecipe
);

router.delete(
  '/:id',
  validate({ params: recipeIdParamSchema }),
  /* #swagger.tags = ['Recipes'] */
  /* #swagger.summary = 'Delete a recipe by ID' */
  /* #swagger.parameters['id'] = { in: 'path', description: 'Recipe ID', required: true, type: 'string' } */
  /* #swagger.responses[200] = { description: 'Delete confirmation', schema: { $ref: '#/definitions/DeleteResponse' } } */
  /* #swagger.responses[400] = { description: 'Invalid ID', schema: { $ref: '#/definitions/ErrorResponse' } } */
  /* #swagger.responses[404] = { description: 'Not found', schema: { $ref: '#/definitions/ErrorResponse' } } */
  /* #swagger.responses[500] = { description: 'Server error', schema: { $ref: '#/definitions/ErrorResponse' } } */
  deleteRecipe
);

export default router;
