//@ts-check
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "thunder.rest API",
      version: "1.0.0",
      description: "Anime statistics widget API for MyAnimeList and AniList platforms",
      contact: {
        name: "geniusanime.com",
        url: "https://github.com/Ryokacchi/anime-widgets"
      },
      license: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT",
      },
    },
    servers: [
      {
        url: "https://geniusanime.com",
        description: "Production server",
      },
    ],
    components: {
      schemas: {
        Error: {
          type: "object",
          properties: {
            title: {
              type: "string",
              description: "Error title",
              example: "Oops! Username is missing.",
            },
            description: {
              type: "string",
              description: 'Error description',
              example: 'Please provide a username to continue.',
            },
          },
        },
        Theme: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Theme name",
              example: "tokyonight",
            },
            background: {
              type: 'string',
              description: 'Background color',
              example: '#1a1b26',
            },
            text: {
              type: "object",
              properties: {
                primary: { type: 'string', example: '#a9b1d6' },
                secondary: { type: 'string', example: '#565f89' },
                muted: { type: 'string', example: '#414868' },
              },
            },
            status: {
              type: 'object',
              properties: {
                watching: { type: 'string', example: '#7aa2f7' },
                completed: { type: 'string', example: '#9ece6a' },
                onHold: { type: 'string', example: '#e0af68' },
                dropped: { type: 'string', example: '#f7768e' },
                planToWatch: { type: 'string', example: '#565f89' },
              },
            },
          },
        },
        AvailableThemes: {
          type: 'object',
          properties: {
            themes: {
              type: 'array',
              items: { type: 'string' },
              description: 'List of available theme names',
              example: ['default', 'tokyonight', 'rule34', 'dracula', 'nord', 'catppuccin', 'gruvbox', 'monokai'],
            },
            message: {
              type: 'string',
              description: 'Response message',
              example: 'Available themes for widgets',
            },
          },
        },
      },
      parameters: {
        Username: {
          name: "username",
          in: "query",
          required: true,
          description: 'Username for the anime platform',
          schema: {
            type: "string",
            example: "erslly",
          },
        },
        Theme: {
          name: 'theme',
          in: 'query',
          required: false,
          description: 'Theme name for widget styling',
          schema: {
            type: 'string',
            enum: ['default', 'tokyonight', 'rule34', 'dracula', 'nord', 'catppuccin', 'gruvbox', 'monokai'],
            default: 'default',
            example: 'tokyonight',
          },
        },
      },
      responses: {
        WidgetSuccess: {
          description: 'Widget generated successfully',
          content: {
            'image/svg+xml': {
              schema: {
                type: 'string',
                format: 'binary',
                description: 'SVG widget image',
              },  
            },
          },
          headers: {
            'Content-Type': {
              schema: {
                type: 'string',
                example: 'image/svg+xml',
              },
            },
            'Cache-Control': {
              schema: {
                type: 'string',
                example: 'no-store, no-cache, must-revalidate, proxy-revalidate',
              },
            },
          },
        },
        BadRequest: {
          description: 'Bad request - invalid parameters',
          content: {
            'image/svg+xml': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
            },
          },
        },
        NotFound: {
          description: 'User not found or no data available',
          content: {
            'image/svg+xml': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
            },
          },
        },
        ServerError: {
          description: 'Internal server error',
          content: {
            'image/svg+xml': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
            },
          },
        },
      },
    },
    tags: [
      {
        name: 'Widgets',
        description: 'Anime statistics widget endpoints'
      },
      {
        name: 'Themes',
        description: 'Theme management endpoints'
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJSDoc(options);
export { swaggerUi, specs };