// controllers/order.controller.js
const orderModel = require('../models/order');

// Crear un nuevo pedido
const createOrder = async (req, res) => {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || !quantity) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    try {
        const order = await orderModel.createOrder(userId, productId, quantity);
        res.status(201).json({ order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el pedido' });
    }
};

// Obtener todos los pedidos
const getAllOrders = async (req, res) => {
    try {
        const orders = await orderModel.getAllOrders();
        res.status(200).json({ orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los pedidos' });
    }
};

// Obtener un pedido por ID
const getOrderById = async (req, res) => {
    const { id } = req.params;
    const orderId = parseInt(id);

    if (isNaN(orderId)) {
        return res.status(400).json({ error: 'ID inválido' });
    }

    try {
        const order = await orderModel.getOrderById(orderId);
        if (order) {
            res.status(200).json({ order });
        } else {
            res.status(404).json({ error: 'Pedido no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el pedido' });
    }
};

// Actualizar un pedido por ID
const updateOrder = async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;
    const orderId = parseInt(id);

    if (isNaN(orderId) || !quantity) {
        return res.status(400).json({ error: 'ID inválido o cantidad no proporcionada' });
    }

    try {
        const order = await orderModel.updateOrder(orderId, quantity);
        if (order) {
            res.status(200).json({ message: 'Pedido actualizado exitosamente', order });
        } else {
            res.status(404).json({ error: 'Pedido no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el pedido' });
    }
};

// Eliminar un pedido por ID
const deleteOrder = async (req, res) => {
    const { id } = req.params;
    const orderId = parseInt(id);

    if (isNaN(orderId)) {
        return res.status(400).json({ error: 'ID inválido' });
    }

    try {
        const order = await orderModel.deleteOrder(orderId);
        if (order) {
            res.status(200).json({ message: 'Pedido eliminado exitosamente' });
        } else {
            res.status(404).json({ error: 'Pedido no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el pedido' });
    }
};

module.exports = { createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder };
