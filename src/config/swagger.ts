import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Task Management API",
            version: "1.0.0",
            description: "API documentation for managing tasks",
            contact: {
                name: "Apsara",
                email: "apsara@mailnator.com",
            },
        },
        servers: [
            {
                url: "http://localhost:4002",
                description: "Local development server",
            },
        ],
    },
    apis: ["./src/routes/v1/*.ts"], // Path to the route files
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);