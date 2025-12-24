const swaggerJSDoc = require("swagger-jsdoc");

const PORT = process.env.PORT || 3000;
const BASE_URL = `${process.env.API_BASE_URL}:${PORT}` || `http://localhost:${PORT}`;

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API - Prueba Técnica",
            version: "1.0.0",
            description: "Documentación de la API.",
            contact: {
                name: "Axel Leonardo",
                email: "axelleo129dev@gmail.com",
            },
            license: {
                name: "MIT",
            },
            tags: [
                { name: "Posts", description: "Operaciones relacionadas a posts" },
            ],
        },
        servers: [
            {
                url: BASE_URL,
                description: "Servidor principal",
            },
        ],
    },
    apis: ["./src/routes/**/*.js", "./src/app.js"],
};

module.exports = swaggerJSDoc(options);
