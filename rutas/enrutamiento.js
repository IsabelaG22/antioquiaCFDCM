const vistas = require('../controladores/controladores');
const crudUsuarios = require('../controladores/crudUsuarios');
const crudServicios = require('../controladores/crudServicios');
const crudMunicipios = require('../controladores/crudMunicipios');
const crudManzanas = require('../controladores/crudManzanas');
const crudAgendas = require('../controladores/crudAgendas');
const crudEstablecimientos = require('../controladores/crudEstablecimientos')
const express = require('express');
const router = express.Router();


//Vistas
router.get('/', vistas.index);
router.get('/admin', vistas.admin);
router.get('/localidades', vistas.localidades);
router.get('/tablaMunicipios', vistas.tablaMunicipios);
router.get('/tablaUsuarios', vistas.tablaUsuarios);
router.get('/tablaServicios', vistas.tablaServicios);
router.get('/tablaManzanas', vistas.tablaManzanas);
router.get('/tablaAgendas', vistas.tablaAgendas);
router.get('/tablaEstablecimientos', vistas.tablaEstablecimiento);
router.get('/formularioRecuperar', vistas.recuperarContra);
router.get('/formularioActualizar', vistas.actualizarContra);
router.get('/informacionManzanas',vistas.informacionManzanas);


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

//Manzanas

router.post('/registrarManzana', crudManzanas.registrarManzana);
router.get('/eliminarManzana/:id', crudManzanas.eliminarManzana);
router.get('/descargarExcelManzana', crudManzanas.descargarExcel);
router.post('/actualizarManzana', crudManzanas.actualizarManzana);

//Agendas

router.post('/registrarAgenda', crudAgendas.registrarAgenda);
router.get('/eliminarAgenda/:id', crudAgendas.eliminarAgenda);
router.get('/descargarExcelAgenda', crudAgendas.descargarExcel);
router.post('/actualizarAgenda', crudAgendas.actualizarAgenda);


//Establecimientos

router.post('/registrarEstablecimiento', crudEstablecimientos.registrarEstablecimiento);
router.get('/eliminarEstablecimiento/:id', crudEstablecimientos.eliminarEstablecimiento);
router.get('/descargarExcelEstablecimiento', crudEstablecimientos.descargarExcel);
router.post('/actualizarEstablecimiento', crudEstablecimientos.actualizarEstablecimiento);


module.exports = router