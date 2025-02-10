require("dotenv").config();  // Cargar las variables de entorno desde el archivo .env


module.exports = {
    port: process.env.PORT || 8383,
    dbUrl: process.env.DATABASE_URL
};
