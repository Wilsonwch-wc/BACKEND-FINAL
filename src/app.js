// app.js
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

// Importar las rutas de productos, pedidos, categorías y usuarios
const productRoutes = require('./routes/product_router');
const orderRoutes = require('./routes/order_router');
const categoryRoutes = require('./routes/category_route');
const userRoutes = require('./routes/user_router');

// Configuración de middlewares
app.use(cors());
app.use(express.json());  // Usar Express JSON en lugar de body-parser


// Rutas
app.use('/api', productRoutes);
app.use('/api', orderRoutes);
app.use('/api', categoryRoutes);
app.use('/api', userRoutes);  // Ruta de usuarios

module.exports = app;
