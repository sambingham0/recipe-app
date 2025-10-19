const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });


const doc = {
  info: {
    title: 'Recipe API',
    description: 'API for CRUD recipes'
  },
  servers: [
    { url: 'http://localhost:3000', description: 'Local dev' },
    { url: process.env.SERVER_URL || 'https://recipe-app-mzwf.onrender.com', description: 'Production' }
  ],
  tags: [
    {
      name: 'Recipes',
      description: 'Recipe CRUD operations'
    }
  ],
  // OpenAPI components (schemas)
  components: {
    schemas: {
      RecipeInput: {
        type: 'object',
        required: ['title', 'ingredients', 'instructions', 'prepTime', 'cookTime', 'difficulty'],
        properties: {
          title: { type: 'string', example: 'Chocolate Cake' },
          description: { type: 'string', example: 'Rich and moist' },
          ingredients: { type: 'array', items: { type: 'string' }, example: ['2 cups flour', '1 cup sugar', '1 cup cocoa powder'] },
          instructions: { type: 'array', items: { type: 'string' }, example: ['Mix ingredients', 'Bake 30 minutes'] },
          prepTime: { type: 'number', example: 15 },
          cookTime: { type: 'number', example: 30 },
          difficulty: { type: 'string', enum: ['Easy', 'Medium', 'Hard'], example: 'Medium' }
        }
      },
      Recipe: {
        type: 'object',
        properties: {
          _id: { type: 'string', example: '67128f0f9f1b146b61a2c001' },
          title: { type: 'string', example: 'Chocolate Cake' },
          description: { type: 'string', example: 'Rich and moist' },
          ingredients: { type: 'array', items: { type: 'string' }, example: ['2 cups flour', '1 cup sugar', '1 cup cocoa powder'] },
          instructions: { type: 'array', items: { type: 'string' }, example: ['Mix ingredients', 'Bake 30 minutes'] },
          prepTime: { type: 'number', example: 15 },
          cookTime: { type: 'number', example: 30 },
          difficulty: { type: 'string', enum: ['Easy', 'Medium', 'Hard'], example: 'Medium' },
          createdBy: { type: 'string', example: '67128f0f9f1b146b61a2cabc' },
          createdAt: { type: 'string', example: '2025-10-18T12:34:56.789Z' }
        }
      },
      ErrorResponse: {
        type: 'object',
        properties: { message: { type: 'string', example: 'Error message' } }
      },
      DeleteResponse: {
        type: 'object',
        properties: { message: { type: 'string', example: 'Recipe deleted successfully' } }
      }
    }
  },
  definitions: {
    // Request body schema for creating/updating a recipe
    RecipeInput: {
      title: 'Chocolate Cake',
      description: 'Rich and moist',
      ingredients: ['2 cups flour', '1 cup sugar', '1 cup cocoa powder'],
      instructions: ['Mix ingredients', 'Bake 30 minutes'],
      prepTime: 15,
      cookTime: 30,
      difficulty: 'Medium'
    },
    // Response schema (includes server-generated fields)
    Recipe: {
      _id: '67128f0f9f1b146b61a2c001',
      title: 'Chocolate Cake',
      description: 'Rich and moist',
      ingredients: ['2 cups flour', '1 cup sugar', '1 cup cocoa powder'],
      instructions: ['Mix ingredients', 'Bake 30 minutes'],
      prepTime: 15,
      cookTime: 30,
      difficulty: 'Medium',
      createdBy: '67128f0f9f1b146b61a2cabc',
      createdAt: '2025-10-18T12:34:56.789Z'
    },
    ErrorResponse: {
      message: 'Error message'
    },
    DeleteResponse: {
      message: 'Recipe deleted successfully'
    }
  }
};

const outputFile = './src/swagger/swagger.json';
const endpointsFiles = ['./src/app.ts'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('Swagger documentation generated!');
});
