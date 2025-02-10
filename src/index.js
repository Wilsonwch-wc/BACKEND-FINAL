// index.js
const app = require('./app');
const pool = require('./config/db');  // Configuración de la base de datos

// Establecer el puerto
const PORT = process.env.PORT || 8383;

// Conectar a la base de datos
pool.connect()
    .then(() => {
        console.log('Conectado a la base de datos');
    })
    .catch(err => {
        console.error('Error al conectar a la base de datos', err);
    });

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
