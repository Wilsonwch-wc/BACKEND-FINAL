// category.controller.js
const categoryModel = require('../models/category');

// Crear una nueva categoría
const createCategory = async (req, res) => {
    const { name } = req.body;
    try {
        const category = await categoryModel.createCategory(name);
        res.status(201).json({ category });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la categoría' });
    }
};

// Obtener todas las categorías
const getAllCategories = async (req, res) => {
    try {
        const categories = await categoryModel.getAllCategories();
        res.status(200).json({ categories });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las categorías' });
    }
};

// Obtener una categoría por ID
const getCategoryById = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await categoryModel.getCategoryById(id);
        if (category) {
            res.status(200).json({ category });
        } else {
            res.status(404).json({ error: 'Categoría no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la categoría' });
    }
};

// Eliminar una categoría por ID
const deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await categoryModel.deleteCategory(id);
        if (category) {
            res.status(200).json({ message: 'Categoría eliminada exitosamente' });
        } else {
            res.status(404).json({ error: 'Categoría no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la categoría' });
    }
};

module.exports = { createCategory, getAllCategories, getCategoryById, deleteCategory };
