require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Importante para Render
  },
});

pool.connect()
  .then(() => console.log("✅ Conexión a la base de datos exitosa"))
  .catch(err => console.error("❌ Error de conexión", err));

module.exports = pool;

