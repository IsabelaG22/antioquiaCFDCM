const vistas = require('../controladores/vistas_paginas')

const express = require('express')
const router = express.Router()

router.get('/', vistas.index);
router.get('/formularioRegistrarU', vistas.formularioRegistroUsuario);
router.post('/registrarUsuario', vistas.registrarUsuario);




module.exports = router