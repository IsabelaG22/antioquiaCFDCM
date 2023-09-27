const modeloEstablecimientos =require('../modelos/establecimientos.model')

//Registrar

exports.registrarEstablecimiento = async (req, res) => {
    const registrarEstablecimiento = new modeloEstablecimientos({
      codigo: req.body.Codigo,
      nombre: req.body.Nombre,
      responsable: req.body.Responsable,
      direccion: req.body.Direccion
    })
    await registrarEstablecimiento.save()

    res.redirect('/tablaEstablecimientos')
    console.log(registrarEstablecimiento)
}
//Actualizar

exports.actualizarEstablecimiento = async (req, res) => {
    const id = { _id: req.body.idnuevo }
    const actu = {
        codigo: req.body.Codigo,
        nombre: req.body.Nombre,
        responsable: req.body.Responsable,
        direccion: req.body.Direccion
    }
    console.log(actu)
    await modeloEstablecimientos.findOneAndUpdate(id, actu)
    res.redirect('/tablaEstablecimientos')
  } 

//Eliminar

exports.eliminarEstablecimiento = async (req,res)=>{
    const id = req.params.id
    await modeloEstablecimientos.findByIdAndDelete({_id: id})
    res.redirect('/tablaEstablecimientos')
}


//exportar exel

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
    const nombreArchivo = 'TablaEstablecimientos'
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
    ws.cell(1, 1).string('Codigo').style(columnaEstilo)
    ws.cell(1, 2).string('Nombre').style(columnaEstilo)
    ws.cell(1, 3).string('Responsable').style(columnaEstilo)
    ws.cell(1, 4).string('Direccion').style(columnaEstilo)
  
    // llamamos a la base de datos
    const listaServicios = await modeloEstablecimientos.find()
  
    // definimos un contador que empiece en 2
    let fila = 2
  
    // agregamos el contenido de la base de datos con un for o un forEach para llamar todos los datos
  
    listaServicios.forEach(datoUsuario => {
      ws.cell(fila, 1).string(datoUsuario.codigo).style(contenidoEstilo)
      ws.cell(fila, 2).string(datoUsuario.nombre).style(contenidoEstilo)
      ws.cell(fila, 3).string(datoUsuario.responsable).style(contenidoEstilo)
      ws.cell(fila, 4).string(datoUsuario.direccion).style(contenidoEstilo)
  
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
  

