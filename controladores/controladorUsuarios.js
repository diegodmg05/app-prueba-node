import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../modelos/Usuario.js';

// Clave secreta para JWT (en producción usar variable de entorno)
const SECRET_KEY = 'clave_super_secreta'; // process.env.SECRET_KEY

// Registro de usuario
export const usuarioRegistro = async (req, res) => {
  try {
    const { codigo, email,clave,nombre} = req.body;

    // Verificar si ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'El usuario ya existe' });

    // Cifrar contraseña
    const hashedPassword = await bcrypt.hash(clave, 10);

    // Crear usuario
    const user = new User({ codigo,nombre, email, clave: hashedPassword, estado: "Activo", numeroErrores: 0, perfil: "Usuario" });
    await user.save();

    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error en el registro', error });
  }
};

// Login
export const usuarioLogin = async (req, res) => {
  try {
    const { email, clave } = req.body;

    // Buscar usuario
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Usuario no encontrado' });

    // Verificar contraseña
    const isMatch = await bcrypt.compare(clave, user.clave);
    if (!isMatch) return res.status(400).json({ message: 'Contraseña incorrecta' });

    // Crear token JWT
    const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ message: 'Login correcto', token });
  } catch (error) {
    res.status(500).json({ message: 'Error en el login', error });
  }
};

// Logout
export const usuarioLogout = (req, res) => {
  res.json({ message: 'Logout correcto' });
};

//Ejemplo de ruta protegida
export const getPerfil = (req, res) => {
  try {

    const authHeader = req.headers['authorization']; // Authorization: Bearer <token>
    if (!authHeader) return res.status(401).json({ message: 'No autenticado' });

    const token = authHeader.split(' ')[1]; // extrae solo el token
    if (!token) return res.status(401).json({ message: 'No autenticado' });
    const decoded = jwt.verify(token, SECRET_KEY);
    res.json({ message: 'Perfil del usuario', user: decoded });
  } catch (error) {
    res.status(401).json({ message: 'Token inválido o expirado' });
  }
};