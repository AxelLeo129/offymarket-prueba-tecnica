/**
 * @file server.js
 * @description
 * Punto de entrada principal de la aplicación.
 * 
 * - Carga las variables de entorno usando dotenv.
 * - Inicializa el servidor HTTP de Express.
 * - Escucha en el puerto configurado por entorno.
 *
 * Este archivo **NO** debe contener lógica de negocio ni definición de rutas.
 */
const app = require("./app");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

/**
 * Inicializa el servidor Express y comienza a escuchar
 * peticiones HTTP entrantes.
 *
 * @listens http
 */
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
