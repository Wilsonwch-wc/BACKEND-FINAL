// models/order.js
const pool = require('../config/db');

// Crear un nuevo pedido
const createOrder = async (userId, productId, quantity) => {
    const query = `
        INSERT INTO orders (user_id, product_id, quantity)
        VALUES ($1, $2, $3) RETURNING *;
    `;
    const values = [userId, productId, quantity];
    const { rows } = await pool.query(query, values);
    return rows[0];
};

// Obtener todos los pedidos con detalles del usuario y producto
const getAllOrders = async () => {
    const query = `
        SELECT 
            orders.id, 
            users.username AS user_name, 
            products.name AS product_name, 
            orders.quantity, 
            orders.created_at
        FROM orders
        JOIN users ON orders.user_id = users.id
        JOIN products ON orders.product_id = products.id
        ORDER BY orders.created_at DESC;
    `;
    const { rows } = await pool.query(query);
    return rows;
};

// Obtener un pedido por ID con detalles del usuario y producto
const getOrderById = async (id) => {
    const query = `
        SELECT 
            orders.id, 
            users.username AS user_name, 
            products.name AS product_name, 
            orders.quantity, 
            orders.created_at
        FROM orders
        JOIN users ON orders.user_id = users.id
        JOIN products ON orders.product_id = products.id
        WHERE orders.id = $1;
    `;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
};

// Actualizar un pedido (cantidad)
const updateOrder = async (id, quantity) => {
    const query = `
        UPDATE orders
        SET quantity = $1
        WHERE id = $2
        RETURNING *;
    `;
    const { rows } = await pool.query(query, [quantity, id]);
    return rows[0];
};

// Eliminar un pedido por ID
const deleteOrder = async (id) => {
    const query = `
        DELETE FROM orders WHERE id = $1 RETURNING *;
    `;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
};

module.exports = { createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder };
