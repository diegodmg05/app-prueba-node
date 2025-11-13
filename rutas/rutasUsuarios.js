const express = require('express');
const router = express.Router();
const ControladorUsuarios = require('../controladores/controladorUsuarios')
//Insertar
router.post('/registro', ControladorUsuarios.usuarioRegistro);
//Loggin
router.post('/login', ControladorUsuarios.usuarioLogin);
//Logout
router.post('/logout', ControladorUsuarios.usuarioLogout);
//Recuperar datos de usuario
router.get('/perfil', ControladorUsuarios.getPerfil);

module.exports = router; 