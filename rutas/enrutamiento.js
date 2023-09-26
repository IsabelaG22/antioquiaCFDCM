const vistas = require('../controladores/controladores')

const express = require('express')
const router = express.Router()
//VER
router.get('/', vistas.index)
router.get('/localidades', vistas.localidades);
router.get('/tabla', vistas.tablas);
router.get('/tablaUsuarios', vistas.tablaUsuarios);
router.get('/formularioRecuperar', vistas.recuperarContra);
router.get('/formularioActualizar', vistas.actualizarContra);
//Formularios registro 
router.get('/formularioRegistro', vistas.formularioRegistroUsuario);
router.get('/formularioMunicipio', vistas.formularioMunicipios);
router.get('/formularioAgendar', vistas.formularioAgendar);
router.get('/formularioEstablecimientos', vistas.formularioEstablecimiento);
router.get('/formularioManzanas', vistas.formularioManzanas);
router.get('/formularioServicios', vistas.formularioServicios);





router.get('/descargarExcel', vistas.descargarExcel);

//ENVIAR DATOS

router.post('/registrarUsuario', vistas.registrarUsuario);



module.exports = router