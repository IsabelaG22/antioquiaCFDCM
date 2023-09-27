const modeloUsuario = require('../modelos/usuarios.model')
const modeloServicios = require('../modelos/servicios.model')
const modeloMunicipios = require('../modelos/municipios.model')

//FUNCIONES PARA RENDERISAR LAS PAGINAS-------
exports.index = (req, res) => {
  res.render('index.ejs')
}

exports.localidades = async(req, res) => {
  const municipios = await modeloMunicipios.find() 
  res.render('localidades.ejs', {
    localidades:municipios
  })
}

exports.admin = (req, res) => {
  res.render('admin.ejs')
}

exports.informacionManzanas = (req, res) => {
  res.render('info_Manzanas.ejs')
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