// order.routes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order_controller');

// Crear pedido
router.post('/orders', orderController.createOrder);

// Obtener todos los pedidos
router.get('/orders', orderController.getAllOrders);

// Obtener un pedido por ID
router.get('/orders/:id', orderController.getOrderById);

// Eliminar un pedido por ID
router.delete('/orders/:id', orderController.deleteOrder);

module.exports = router;
