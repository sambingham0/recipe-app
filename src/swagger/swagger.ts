// Minimal Swagger Autogen setup with auto-detection disabled so only explicit docs are used
const swaggerAutogen = require('swagger-autogen')({
  openapi: '3.0.0',
  autoHeaders: false,
  autoQuery: false,
  autoBody: false,
});


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
    { name: 'Recipes', description: 'Recipe CRUD operations' },
    { name: 'Auth', description: 'Authentication endpoints' }
  ],
  // Keep concise, explicit overrides so paths include route mount prefixes and avoid extra fields
  paths: {
    '/recipes': {
      get: {
        tags: ['Recipes'],
        summary: 'List recipes',
        responses: {
          '200': {
            description: 'Array of recipes',
            content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/definitions/Recipe' } } } }
          },
          '500': { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/definitions/ErrorResponse' } } } }
        }
      },
      post: {
        tags: ['Recipes'],
        summary: 'Create recipe',
        security: [{ cookieAuth: [] }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/definitions/RecipeInput' } } }
        },
        responses: {
          '201': { description: 'Created', content: { 'application/json': { schema: { $ref: '#/definitions/Recipe' } } } },
          '400': { description: 'Validation error', content: { 'application/json': { schema: { $ref: '#/definitions/ErrorResponse' } } } },
          '401': { description: 'Authentication required', content: { 'application/json': { schema: { $ref: '#/definitions/ErrorResponse' } } } },
          '500': { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/definitions/ErrorResponse' } } } }
        }
      }
    },
    '/recipes/{id}': {
      get: {
        tags: ['Recipes'],
        summary: 'Get recipe by ID',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' }, description: 'Recipe ID' }
        ],
        responses: {
          '200': { description: 'Recipe', content: { 'application/json': { schema: { $ref: '#/definitions/Recipe' } } } },
          '400': { description: 'Invalid ID', content: { 'application/json': { schema: { $ref: '#/definitions/ErrorResponse' } } } },
          '404': { description: 'Not found', content: { 'application/json': { schema: { $ref: '#/definitions/ErrorResponse' } } } },
          '500': { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/definitions/ErrorResponse' } } } }
        }
      },
      put: {
        tags: ['Recipes'],
        summary: 'Update a recipe by ID',
        security: [{ cookieAuth: [] }],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' }, description: 'Recipe ID' }
        ],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/definitions/RecipeInput' } } }
        },
        responses: {
          '204': { description: 'No Content - recipe updated successfully' },
          '400': { description: 'Invalid ID or body', content: { 'application/json': { schema: { $ref: '#/definitions/ErrorResponse' } } } },
          '401': { description: 'Authentication required', content: { 'application/json': { schema: { $ref: '#/definitions/ErrorResponse' } } } },
          '403': { description: 'Forbidden - not owner', content: { 'application/json': { schema: { $ref: '#/definitions/ErrorResponse' } } } },
          '404': { description: 'Not found', content: { 'application/json': { schema: { $ref: '#/definitions/ErrorResponse' } } } },
          '500': { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/definitions/ErrorResponse' } } } }
        }
      },
      delete: {
        tags: ['Recipes'],
        summary: 'Delete a recipe by ID',
        security: [{ cookieAuth: [] }],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' }, description: 'Recipe ID' }
        ],
        responses: {
          '200': { description: 'Delete confirmation', content: { 'application/json': { schema: { $ref: '#/definitions/DeleteResponse' } } } },
          '400': { description: 'Invalid ID', content: { 'application/json': { schema: { $ref: '#/definitions/ErrorResponse' } } } },
          '401': { description: 'Authentication required', content: { 'application/json': { schema: { $ref: '#/definitions/ErrorResponse' } } } },
          '403': { description: 'Forbidden - not owner', content: { 'application/json': { schema: { $ref: '#/definitions/ErrorResponse' } } } },
          '404': { description: 'Not found', content: { 'application/json': { schema: { $ref: '#/definitions/ErrorResponse' } } } },
          '500': { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/definitions/ErrorResponse' } } } }
        }
      }
    },
    '/auth/google': {
      get: { tags: ['Auth'], summary: 'Start Google OAuth flow', responses: { '302': { description: 'Redirects to Google for authentication' } } }
    },
    '/auth/google/callback': {
      get: {
        tags: ['Auth'],
        summary: 'Google OAuth callback',
        responses: {
          '200': { description: 'Authentication successful', content: { 'application/json': { schema: { type: 'object', properties: { message: { type: 'string' }, user: { type: 'object' } } } } } },
          '401': { description: 'Authentication failed', content: { 'application/json': { schema: { $ref: '#/definitions/ErrorResponse' } } } }
        }
      }
    },
    '/auth/google/failure': {
      get: { tags: ['Auth'], summary: 'Google OAuth failure', responses: { '401': { description: 'Authentication failed', content: { 'application/json': { schema: { $ref: '#/definitions/ErrorResponse' } } } } } }
    },
    '/auth/logout': {
      post: { tags: ['Auth'], summary: 'Log out and destroy session', responses: { '200': { description: 'Logged out', content: { 'application/json': { schema: { type: 'object', properties: { message: { type: 'string', example: 'Logged out' } } } } } } } }
    }
  },
  definitions: {
    RecipeInput: {
      type: 'object',
      required: ['title', 'ingredients', 'instructions', 'prepTime', 'cookTime', 'difficulty'],
      properties: {
        title: { type: 'string', example: 'Chocolate Cake' },
        description: { type: 'string', example: 'Rich and moist' },
        ingredients: { type: 'array', items: { type: 'string' }, example: ['2 cups flour', '1 cup sugar', '1 cup cocoa powder'] },
        instructions: { type: 'array', items: { type: 'string' }, example: ['Mix ingredients', 'Bake 30 minutes'] },
        prepTime: { type: 'integer', example: 15 },
        cookTime: { type: 'integer', example: 30 },
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
        prepTime: { type: 'integer', example: 15 },
        cookTime: { type: 'integer', example: 30 },
        difficulty: { type: 'string', enum: ['Easy', 'Medium', 'Hard'], example: 'Medium' },
        createdBy: { type: 'string', example: '67128f0f9f1b146b61a2cabc' },
        createdAt: { type: 'string', format: 'date-time', example: '2025-10-18T12:34:56.789Z' }
      }
    },
    ErrorResponse: {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'Error message' },
            code: { type: 'string', example: 'RECIPE_NOT_FOUND' },
            details: { type: 'object', nullable: true },
          }
        }
      }
    },
    DeleteResponse: {
      type: 'object',
      properties: { message: { type: 'string', example: 'Recipe deleted successfully' } }
    }
  },
  components: {
    securitySchemes: {
      cookieAuth: {
        type: 'apiKey',
        in: 'cookie',
        name: 'connect.sid',
        description: 'Session cookie for authenticated requests'
      }
    }
  },
};

const outputFile = './src/swagger/swagger.json';
const endpointsFiles = ['./src/app.ts'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('Swagger documentation generated!');
});
