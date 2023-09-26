const vistas = require('../controladores/vistas_paginas')

const express = require('express')
const router = express.Router()

router.get('/', vistas.index)
router.get('/localidades', vistas.localidades);
router.get('/tabla', vistas.tablas);
router.get('/tablaUsuarios', vistas.tablaUsuarios);
router.get('/formularioRegistro', vistas.formularioRegistroUsuario)
router.get('/formularioRecuperar', vistas.recuperarContra)
router.get('/formularioActualizar', vistas.actualizarContra)



module.exports = router