const express = require('express');
const router = express.Router();
const ControladorJuegos = require('../controladores/controladorJuegos');
//Obtener
router.get('/', ControladorJuegos.getJuegos);
router.get('/:id', ControladorJuegos.getJuego);
//Insertar
router.post('/', ControladorJuegos.crearJuego);
//Actualizar
router.put('/:id', ControladorJuegos.actualizarJuego);
//Eliminar
router.delete('/:id', ControladorJuegos.eliminarJuego);
module.exports = router; 