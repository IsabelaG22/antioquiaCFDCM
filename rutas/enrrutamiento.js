const vistas = require('../controladores/vistas_paginas')

const express = require('express')
const router = express.Router()

router.get('/', vistas.index)


module.exports = router