const vistas = require('../controladores/controladores');
const crudUsuarios = require('../controladores/crudUsuarios');
const crudServicios = require('../controladores/crudServicios');
const crudMunicipios = require('../controladores/crudMunicipios')
const express = require('express');
const router = express.Router();


//Vistas
router.get('/', vistas.index);
router.get('/admin', vistas.admin);
router.get('/localidades', vistas.localidades);
router.get('/tablaMunicipios', vistas.tablaMunicipios);
router.get('/tablaUsuarios', vistas.tablaUsuarios);
router.get('/tablaServicios', vistas.tablaServicios)
router.get('/formularioRecuperar', vistas.recuperarContra);
router.get('/formularioActualizar', vistas.actualizarContra);


//Formularios registro 
router.get('/formularioRegistro', vistas.formularioRegistroUsuario);
router.get('/formularioMunicipio', vistas.formularioMunicipios);
router.get('/formularioAgendar', vistas.formularioAgendar);
router.get('/formularioEstablecimientos', vistas.formularioEstablecimiento);
router.get('/formularioManzanas', vistas.formularioManzanas);
router.get('/formularioServicios', vistas.formularioServicios);


//ENVIAR DATOS
//Usuario
router.get('/descargarExcel', crudUsuarios.descargarExcel);
router.post('/registrarUsuario', crudUsuarios.registrarUsuario);
router.get('/eliminarU/:id', crudUsuarios.eliminarUsuario );
router.post('/actualizarUsuario', crudUsuarios.actualizarusuario);
router.post('/inicioSesion', crudUsuarios.inicioSesion)


//Servicios
router.post('/registrarServicio', crudServicios.registrarServicio);
router.get('/eliminarS/:id', crudServicios.eliminarServicio);
router.get('/descargarExcelServicios', crudServicios.descargarExcel);
router.post('/actualizarServicio', crudServicios.actualizarServicio);

//Municipios

router.post('/registrarMunicipio', crudMunicipios.registrarMunicipio);
router.get('/eliminarM/:id', crudMunicipios.eliminarMunicipio);
router.get('/descargarExcelMunicipio', crudMunicipios.descargarExcel);
router.post('/actualizarMunicipio', crudMunicipios.actualizarMunicipio);




module.exports = router