const modeloUsuario = require('../modelos/usuarios.model')
const modeloServicios = require('../modelos/servicios.model')
const modeloMunicipios = require('../modelos/municipios.model')
const modelosManzanas = require('../modelos/manzanas.model');
const modeloAgendas = require('../modelos/agendas.model')
const modeloEstablecimientos = require('../modelos/establecimientos.model')

//FUNCIONES PARA RENDERISAR LAS PAGINAS-------
exports.index = async (req, res) => {
  const serviciosInfo = await modeloServicios.find()
  res.render('../frontend/vistas/index.ejs',{
    servicios: serviciosInfo,
    rol: req.cookies.rol,
    usuario: await modeloUsuario.findOne({ _id: req.cookies.usuarios }),
  })
}

exports.localidades = async(req, res) => {
  const municipios = await modeloMunicipios.find() 
  res.render('../frontend/vistas/localidades.ejs', {
    localidades:municipios
  })
}

exports.admin = (req, res) => {
  res.render('../frontend/vistas/admin/admin.ejs')
}

exports.informacionManzanas = (req, res) => {
  res.render('../frontend/vistas/info_Manzanas.ejs')
}

exports.informacionLavanderia = (req,res) => {
  res.render('../frontend/vistas/infoLavanderia.ejs')
}


//FORMULARIOS
exports.formularioMunicipios = (req, res) => {
  res.render('../frontend/vistas/admin/formularioRegistrarMunicipio');
}
exports.formularioAgendar = (req, res) => {
  res.render('../frontend/vistas/usuarios/formularioAgendar.ejs');
}

exports.formularioServicios = (req, res) => {
  res.render('../frontend/vistas/admin/formularioServicios.ejs');
}

exports.formularioManzanas = (req, res) => {
  res.render('../frontend/vistas/admin/formularioManzanas.ejs');
}
exports.formularioEstablecimiento = (req, res) => {
  res.render('../frontend/vistas/admin/formularioEstablecimientos.ejs');
}

exports.formularioRegistroUsuario = (req, res) => {
  res.render('../frontend/vistas/usuarios/formularioRegistrarUsuario.ejs')
}






//TABLAS
exports.tablaEstablecimiento = async (req,res)=>{
  const tablaEstablecimientos = await modeloEstablecimientos.find()
  res.render('../frontend/vistas/admin/tablaEstablecimientos.ejs',{
    establecimiento: tablaEstablecimientos
  })
}
exports.tablaAgendas = async (req,res)=>{
  const tablaAgendas = await modeloAgendas.find()
  res.render('../frontend/vistas/admin/tablaAgendas.ejs',{
    agendas: tablaAgendas
  })
}
exports.tablaManzanas = async (req, res)=>{
  const tablaManzanas = await modelosManzanas.find()
  res.render('../frontend/vistas/admin/tablaManzanas.ejs',{
    manzanas: tablaManzanas
  })
}
exports.tablaMunicipios = async (req, res) => {
  const tablaMunicipios = await modeloMunicipios.find()
  res.render('../frontend/vistas/admin/tablaMunicipios',{
    municipios: tablaMunicipios
  })
}

exports.tablaUsuarios = async (req, res) => {
  const tablaUsuarios = await modeloUsuario.find()
  res.render('../frontend/vistas/admin/tablaUsuarios.ejs', {
    usuarios: tablaUsuarios
  })
}

exports.tablaServicios = async(req, res)=>{
  const tablaServicios = await modeloServicios.find()
  res.render('../frontend/vistas/admin/tablaServicios.ejs', {
    servicios: tablaServicios
  })
}