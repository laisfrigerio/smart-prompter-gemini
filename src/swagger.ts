// src/swagger.ts
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Smart Prompt API",
      version: "1.0.0",
      description: "API de gerenciamento de templates e categorias de prompts.",
    },
    servers: [
      {
        url: "http://localhost:3000", // URL do seu servidor
      },
    ],
    components: {
      schemas: {
        Category: {
          type: "object",
          properties: {
            id: {
              type: "string",
            },
            name: {
              type: "string",
            },
            description: {
              type: "string",
            },
            templates: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Template",
              },
            },
          },
        },
        Template: {
          type: "object",
          properties: {
            id: {
              type: "string",
            },
            title: {
              type: "string",
            },
            content: {
              type: "string",
            },
            categories: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Category",
              },
            },
          },
        },
      },
    },
  },
  apis: ["./src/controllers/*.ts"], // Caminho para os arquivos dos controladores
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec };
