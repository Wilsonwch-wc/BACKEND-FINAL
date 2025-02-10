const pool = require('../config/db');
const bcrypt = require('bcryptjs');

 
// Crear un nuevo usuario
const createUser = async (username, email, password) => {
    const result = await pool.query(
        'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
        [username, email, password]
    );
    return result.rows[0];
};

// Obtener un usuario por email
const getUserByEmail = async (email) => {
    const result = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
    );
    return result.rows[0];  // Retorna el primer usuario encontrado
};
// Obtener un usuario por ID
const getUserById = async (id) => {
    const result = await pool.query(
        'SELECT * FROM users WHERE id = $1',
        [id]
    );
    return result.rows[0]; // Retorna el usuario con el id específico
};


// Obtener un usuario por username
const getUserByUsername = async (username) => {
    const result = await pool.query(
        'SELECT * FROM users WHERE username = $1',
        [username]
    );
    return result.rows[0];
};

// Obtener todos los usuarios
const getAllUsers = async () => {
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
};

// Actualizar un usuario por ID
const updateUser = async (id, username, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10); // Cifrar la contraseña
    const result = await pool.query(
        'UPDATE users SET username = $1, email = $2, password = $3 WHERE id = $4 RETURNING *',
        [username, email, hashedPassword, id]
    );
    return result.rows[0];
};

// Eliminar un usuario por ID
const deleteUser = async (id) => {
    const result = await pool.query(
        'DELETE FROM users WHERE id = $1 RETURNING *',
        [id]
    );
    return result.rows[0];
};

module.exports = {getUserById, createUser, getUserByEmail, getUserByUsername, getAllUsers, updateUser, deleteUser };
