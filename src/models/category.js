// category.model.js
const pool = require('../config/db');

// Crear una nueva categoría
const createCategory = async (name) => {
    const result = await pool.query(
        'INSERT INTO categories (name) VALUES ($1) RETURNING *',
        [name]
    );
    return result.rows[0];
};

// Obtener todas las categorías
const getAllCategories = async () => {
    const result = await pool.query('SELECT * FROM categories');
    return result.rows;
};

// Obtener una categoría por ID
const getCategoryById = async (id) => {
    const result = await pool.query(
        'SELECT * FROM categories WHERE id = $1',
        [id]
    );
    return result.rows[0];
};

// Eliminar una categoría por ID
const deleteCategory = async (id) => {
    const result = await pool.query(
        'DELETE FROM categories WHERE id = $1 RETURNING *',
        [id]
    );
    return result.rows[0];
};

module.exports = { createCategory, getAllCategories, getCategoryById, deleteCategory };
