// Swagger Config
const swaggerJsdoc = require("swagger-jsdoc");

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Projektstudium WebApp API",
            version: "0.1.0",
            description:
                "This the API documentation for Projektstudium WebApp.",
        },

    },
    apis: ["./app.js", "./config/schemas.js"],
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);

module.exports = swaggerDocs;
