// category.routes.js
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category_controller');

// Crear categoría
router.post('/categories', categoryController.createCategory);

// Obtener todas las categorías
router.get('/categories', categoryController.getAllCategories);

// Obtener una categoría por ID
router.get('/categories/:id', categoryController.getCategoryById);

// Eliminar una categoría por ID
router.delete('/categories/:id', categoryController.deleteCategory);

module.exports = router;
