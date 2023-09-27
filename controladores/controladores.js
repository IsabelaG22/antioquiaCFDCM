const modeloUsuario = require('../modelos/usuarios.model')

//FUNCIONES PARA RENDERISAR LAS PAGINAS-------
exports.index = (req,res)=>{
    res.render('index.ejs')
}

exports.localidades = (req,res)=>{
  res.render('localidades.ejs')
}
exports.formularioMunicipios = (req, res)=>{
  res.render('formularioRegistrarMunicipio');
}
exports.formularioAgendar = (req, res)=>{
  res.render('formularioAgendar.ejs');
}

exports.formularioServicios = (req, res)=>{
  res.render('formularioServicios.ejs');
}

exports.formularioManzanas = (req, res)=>{
  res.render('formularioManzanas.ejs');
}
exports.formularioEstablecimiento = (req, res)=>{
  res.render('formularioEstablecimientos.ejs');
}

exports.formularioRegistroUsuario =  (req,res)=>{
    res.render('formularioRegistrarUsuario.ejs')
}

  exports.tablas = (req,res)=>{
    res.render('tabla')
  }

  exports.tablaUsuarios = async (req, res) => {
    const tablaUsuarios = await modeloUsuario.find()
    res.render('tablaUsuarios.ejs', {
      usuarios: tablaUsuarios
    })
  }
  exports.recuperarContra = (req,res)=>{
    res.render('formularioRecuperarContraseña.ejs')
  }

  exports.actualizarContra = (req,res)=>{
    res.render('formularioActualizarContra.ejs')
  }
  
  exports.admin = (req,res)=>{
    res.render('admin.ejs')
  }

//FUNCIONES CRUD-----------

exports.registrarUsuario = async (req, res) => {
    const registrarUsuario = new modeloUsuario({
      tipoDocumento: req.body.tipo,
      documentoUsuario: req.body.documento,
      nombreUsuario: req.body.Nombre,
      apellidoUsuario: req.body.Apellido,
      telefonoUsuario: req.body.Telefono,
      ubicacionUsuario: req.body.direccion,
      ciudadUsuario: req.body.Ciudad,
      ocupacionUsuario: req.body.Ocupacion,
      correoElectronicoUsuario: req.body.correo,
      contraseñaUsuario: req.body.contraseña
    })
    await registrarUsuario.save()

    res.render('index.ejs')
    console.log(registrarUsuario)
} // funcion para que los datos del usuario sean guardados en la base de datos 

  // GENERAR TABLA EXCEL DE LOS DATOS SOBRE LOS PRODUCTOS ----------------------------------------

  const xl = require('excel4node')
  const path = require('path')
  const fs = require('fs')
  const multer = require('multer')
  
  exports.descargarExcel = async (req, res) => {
    // configuramos el excel4node
  
    // creamos un nuevo documento
    const wb = new xl.Workbook()
    // definimos el nombre con el cual se descargara el archivo
    const nombreArchivo = 'TablaProductos'
    // se define el nombre
    const ws = wb.addWorksheet(nombreArchivo)
  
    // definimos estilos
    const columnaEstilo = wb.createStyle({
      font: {
        name: 'Arial',
        color: '#AB2002',
        size: 12,
        bold: true
      }
    })
  
    const contenidoEstilo = wb.createStyle({
      font: {
        name: 'Arial',
        color: '#565656',
        size: 11
      }
    })
  
    // definimos el nombre de las columnas
    ws.cell(1, 1).string('nombre').style(columnaEstilo)
    ws.cell(1, 2).string('apellido').style(columnaEstilo)
    ws.cell(1, 3).string('documento').style(columnaEstilo)
  
    // llamamos a la base de datos
    const listaProductos = await modeloUsuario.find()
  
    // definimos un contador que empiece en 2
    let fila = 2
  
    // agregamos el contenido de la base de datos con un for o un forEach para llamar todos los datos
  
    listaProductos.forEach(datoUsuario => {
      ws.cell(fila, 1).string(datoUsuario.nombreUsuario).style(contenidoEstilo)
      ws.cell(fila, 2).string(datoUsuario.apellidoUsuario).style(contenidoEstilo)
      ws.cell(fila, 3).string(datoUsuario.documentoUsuario).style(contenidoEstilo)
  
      fila = fila + 1
    })
  
    const rutaExcel = path.join(__dirname, 'excel' + nombreArchivo + '.xlsx')
  
    // escribir y guardar en el documento
    // se le inclulle la ruta y una funcion
    wb.write(rutaExcel, function (err, stars) {
      // capturamos y mostramos en caso de un error
      if (err) console.log(err)
      // creamos una funcion que descargue el archibo y lo elimine
      else {
        // guardamos el documento en la carpeta para excel para poder descargarla en el pc
        res.download(rutaExcel)
  
        console.log('documento descargado correctamente')
  
        // Eliminamos el documento de la carpeta excel
        fs.rm(rutaExcel, function (err) {
          if (err) console.log(err)
          else console.log('Archivo descargado y borrado del servidor correctamente')
        })
      }
    })
  }
  