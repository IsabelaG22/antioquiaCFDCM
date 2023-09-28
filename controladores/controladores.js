const modeloUsuario = require('../modelos/usuarios.model')
const modeloServicios = require('../modelos/servicios.model')
const modeloMunicipios = require('../modelos/municipios.model')
const modelosManzanas = require('../modelos/manzanas.model');
const modeloAgendas = require('../modelos/agendas.model')
const modeloEstablecimientos = require('../modelos/establecimientos.model')

//FUNCIONES PARA RENDERISAR LAS PAGINAS-------
exports.index = async (req, res) => {
  res.render('index.ejs',{
    rol: req.cookies.rol,
    usuario: await modeloUsuario.findOne({ _id: req.cookies.usuarios }),
  })
}

exports.localidades = (req, res) => {
  res.render('localidades.ejs')
}

exports.admin = (req, res) => {
  res.render('admin.ejs')
}


//FORMULARIOS
exports.formularioMunicipios = (req, res) => {
  res.render('formularioRegistrarMunicipio');
}
exports.formularioAgendar = (req, res) => {
  res.render('formularioAgendar.ejs');
}

exports.formularioServicios = (req, res) => {
  res.render('formularioServicios.ejs');
}

exports.formularioManzanas = (req, res) => {
  res.render('formularioManzanas.ejs');
}
exports.formularioEstablecimiento = (req, res) => {
  res.render('formularioEstablecimientos.ejs');
}

exports.formularioRegistroUsuario = (req, res) => {
  res.render('formularioRegistrarUsuario.ejs')
}

exports.recuperarContra = (req, res) => {
  res.render('formularioRecuperarContraseña.ejs')
}

exports.actualizarContra = (req, res) => {
  res.render('formularioActualizarContra.ejs')
}




//TABLAS
exports.tablaEstablecimiento = async (req,res)=>{
  const tablaEstablecimientos = await modeloEstablecimientos.find()
  res.render('tablaEstablecimientos.ejs',{
    establecimiento: tablaEstablecimientos
  })
}
exports.tablaAgendas = async (req,res)=>{
  const tablaAgendas = await modeloAgendas.find()
  res.render('tablaAgendas.ejs',{
    agendas: tablaAgendas
  })
}
exports.tablaManzanas = async (req, res)=>{
  const tablaManzanas = await modelosManzanas.find()
  res.render('tablaManzanas.ejs',{
    manzanas: tablaManzanas
  })
}
exports.tablaMunicipios = async (req, res) => {
  const tablaMunicipios = await modeloMunicipios.find()
  res.render('tablaMunicipios',{
    municipios: tablaMunicipios
  })
}

exports.tablaUsuarios = async (req, res) => {
  const tablaUsuarios = await modeloUsuario.find()
  res.render('tablaUsuarios.ejs', {
    usuarios: tablaUsuarios
  })
}

exports.tablaServicios = async(req, res)=>{
  const tablaServicios = await modeloServicios.find()
  res.render('tablaServicios.ejs', {
    servicios: tablaServicios
  })
}