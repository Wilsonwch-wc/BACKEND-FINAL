const userModel = require('../models/user');
const bcrypt = require('bcryptjs'); // Usando bcryptjs
const jwt = require('jsonwebtoken');



// Login de usuario
const login = async (req, res) => {
    const { email, password } = req.body;
    console.log('Datos recibidos para login:', email, password);  // Ver los datos

    try {
        // Verificar si el usuario existe
        const user = await userModel.getUserByEmail(email);
        console.log('Usuario encontrado:', user); // Ver el usuario obtenido

        if (!user) {
            return res.status(400).json({ error: 'Credenciales incorrectas' });
        }

        // Comparar las contraseñas
        const validPassword = await bcrypt.compare(password, user.password);
        console.log('Contraseña válida:', validPassword); // Ver si la contraseña es correcta

        if (!validPassword) {
            return res.status(400).json({ error: 'Credenciales incorrectas' +email +" " + password });
        }

        // Crear el token JWT
        const token = jwt.sign({ id: user.id, username: user.username }, 'secreto_de_jwt', { expiresIn: '1h' });
        res.status(200).json({ token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el proceso de login' });
    }
};
// Crear un nuevo usuario
const createUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);  // Genera un salt
        const hashedPassword = await bcrypt.hash(password, salt);  // Encripta la contraseña

        // Crear el usuario con la contraseña encriptada
        const user = await userModel.createUser(username, email, hashedPassword);
        res.status(201).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el usuario' });
    }
};




// Obtener todos los usuarios
const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.getAllUsers();
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
};

// Obtener un usuario por ID
 
const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        // Usa el método correcto para obtener el usuario por ID
        const user = await userModel.getUserById(id); 
        if (user) {
            res.status(200).json({ user });
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
};



// Actualizar un usuario por ID
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, email, password } = req.body;

    try {
        const user = await userModel.updateUser(id, username, email, password);
        if (user) {
            res.status(200).json({ user });
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
};

// Eliminar un usuario por ID
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await userModel.deleteUser(id);
        if (user) {
            res.status(200).json({ message: 'Usuario eliminado exitosamente' });
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
};

module.exports = { login, createUser, getAllUsers, getUserById, updateUser, deleteUser };
