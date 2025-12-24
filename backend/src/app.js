/**
 * @file app.js
 * @description
 * Configuración principal de la aplicación Express.
 *
 * Responsabilidades de este archivo:
 * - Inicializar la instancia de Express.
 * - Registrar middlewares globales (CORS, JSON).
 * - Montar las rutas de la API.
 * - Exponer la documentación Swagger.
 *
 * Este archivo **no** debe iniciar el servidor (`listen`);
 * esa responsabilidad pertenece al archivo de arranque (server.js).
 */
const express = require("express");
const cors = require("cors");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const postsRouter = require("./routes/posts");
/**
 * Instancia principal de la aplicación Express.
 *
 * @type {import("express").Express}
 */
const app = express();

/**
 * Middleware global para habilitar CORS.
 * Permite que clientes externos (frontend u otros servicios)
 * consuman la API sin restricciones de origen.
 */
app.use(cors());

/**
 * Middleware global para parsear cuerpos JSON.
 * Permite recibir datos en formato application/json.
 */
app.use(express.json());

/**
 * Rutas relacionadas con la gestión de posts.
 *
 * Prefijo base:
 *   /posts
 *
 * Ejemplo:
 *   GET /posts
 */
app.use("/posts", postsRouter);

/**
 * Exposición de la documentación Swagger (OpenAPI 3.0).
 *
 * Ruta:
 *   /api-docs
 *
 * Permite visualizar y probar los endpoints de la API
 * directamente desde el navegador.
 */
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;
