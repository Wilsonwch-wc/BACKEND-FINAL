// product.model.js
const pool = require('../config/db');

// Crear un nuevo producto
const createProduct = async (name, price, categoryId) => {
    const result = await pool.query(
        'INSERT INTO products (name, price, category_id) VALUES ($1, $2, $3) RETURNING *',
        [name, price, categoryId]
    );
    return result.rows[0];
};
// Obtener todos los productos
const getAllProducts = async () => {
    const result = await pool.query('SELECT p.id, p.name, p.price, p.category_id, c.name AS category_name  FROM products p LEFT JOIN categories c ON p.category_id = c.id');
    return result.rows;
};

// Obtener un producto por ID
const getProductById = async (id) => {
    const result = await pool.query(
        'SELECT * FROM products WHERE id = $1',
        [id]
    );
    return result.rows[0];
};

// Actualizar un producto por ID
const updateProduct = async (id, name, price, categoryId) => {
    const result = await pool.query(
        'UPDATE products SET name = $1, price = $2, category_id = $3 WHERE id = $4 RETURNING *',
        [name, price, categoryId, id]
    );
    return result.rows[0];
};

// Eliminar un producto por ID
const deleteProduct = async (id) => {
    const result = await pool.query(
        'DELETE FROM products WHERE id = $1 RETURNING *',
        [id]
    );
    return result.rows[0];
};

module.exports = { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct };
