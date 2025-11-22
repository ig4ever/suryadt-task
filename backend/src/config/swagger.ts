import swaggerJsdoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"
import { Application } from "express"

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "SuryADT API",
      version: "1.0.0",
    },
    servers: [{ url: "/api/v1" }],
    components: {
      securitySchemes: {
        bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
      },
    },
  },
  apis: [
    "./src/routes/*.ts",
  ],
}

export const setupSwagger = (app: Application): void => {
  const specs = swaggerJsdoc(options)
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs))
}