const vistas = require('../controladores/vistas_paginas')

const express = require('express')
const router = express.Router()

router.get('/', vistas.index)
router.get('/localidades', vistas.localidades)
router.get('/formularioRegistro', vistas.formularioRegistroUsuario)

module.exports = router