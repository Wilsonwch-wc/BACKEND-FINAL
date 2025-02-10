// product.controller.js
const productModel = require('../models/product');

// Crear un nuevo producto
const createProduct = async (req, res) => {
    const { name, price, categoryId } = req.body;
    try {
        const product = await productModel.createProduct(name, price, categoryId);
        res.status(201).json({ product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el producto' });
    }
};

// Obtener todos los productos
const getAllProducts = async (req, res) => {
    try {
        const products = await productModel.getAllProducts();
        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
};

// Obtener todos los productos
const Name_category = async (req, res) => {
    try {
        const products = await productModel.Name_category();
        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
};

// Obtener un producto por ID
const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await productModel.getProductById(id);
        if (product) {
            res.status(200).json({ product });
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
};

// Actualizar un producto por ID
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, categoryId } = req.body;
    try {
        const product = await productModel.updateProduct(id, name, price, categoryId);
        if (product) {
            res.status(200).json({ product });
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
};

// Eliminar un producto por ID
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await productModel.deleteProduct(id);
        if (product) {
            res.status(200).json({ message: 'Producto eliminado exitosamente' });
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
};

module.exports = { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct,Name_category };
