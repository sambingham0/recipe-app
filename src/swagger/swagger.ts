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
  // Explicit path overrides so generated doc matches runtime behavior
  paths: {
    '/recipes/{id}': {
      put: {
        tags: ['Recipes'],
        summary: 'Update a recipe by ID',
        description: '',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' }, description: 'Recipe ID' }
        ],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/RecipeInput' } } }
        },
        responses: {
          '204': { description: 'No Content - recipe updated successfully' },
          '400': { description: 'Invalid ID or body', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
          '404': { description: 'Not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
          '500': { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } }
        }
      }
    }
  },

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
    },
    securitySchemes: {
      cookieAuth: {
        type: 'apiKey',
        in: 'cookie',
        name: 'connect.sid',
        description: 'Session cookie for authenticated requests (replace with bearer/OAuth2 if applicable)'
      }
    }
  },
};

const outputFile = './src/swagger/swagger.json';
const endpointsFiles = ['./src/routes/recipeRoutes.ts', './src/routes/authRoutes.ts'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('Swagger documentation generated!');
});
