const modeloAgendas = require('../modelos/agendas.model')


//FUNCIONES CRUD-----------
//registrar agendas 
exports.registrarAgenda = async (req, res) => {
    const registrarAgenda = new modeloAgendas({
        manzana: req.body.manzana,
        servicio: req.body.servicio,
      fecha: req.body.fecha,
      correoElectronico: req.body.correo
    })
    await registrarAgenda.save()

    res.redirect('/tablaAgendas')
    console.log(registrarAgenda)
} // funcion para que los datos del agendas sean guardados en la base de datos 

//eliminar agendas 

exports.eliminarAgenda = async (req, res)=>{
    const id = req.params.id;
    await modeloAgendas.findByIdAndDelete({_id: id})
    res.redirect('/tablaAgendas')
   
}

//Actualizar agendas 
exports.actualizarAgenda = async (req, res) => {
    const id = { _id: req.body.idnuevo }
    const actu = {
        manzana: req.body.Manzana,
        servicio: req.body.Servicio,
      fecha: req.body.Fecha,
      correoElectronico: req.body.Correo
    }
    console.log(actu)
    await modeloAgendas.findOneAndUpdate(id, actu)
    res.redirect('/tablaAgendas')

  }

  //Login


//exportar exel

  // GENERAR TABLA EXCEL DE LOS DATOS SOBRE LAS AGENDAS ----------------------------------------

  const xl = require('excel4node')
  const path = require('path')
  const fs = require('fs')
  const multer = require('multer')
  
  exports.descargarExcel = async (req, res) => {
    // configuramos el excel4node
  
    // creamos un nuevo documento
    const wb = new xl.Workbook()
    // definimos el nombre con el cual se descargara el archivo
    const nombreArchivo = 'tablaAgenda'
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
    ws.cell(1, 1).string('manzana').style(columnaEstilo)
    ws.cell(1, 2).string('servicio').style(columnaEstilo)
    ws.cell(1, 3).string('fecha').style(columnaEstilo)
    ws.cell(1, 4).string('correo electronico').style(columnaEstilo)

  
    // llamamos a la base de datos
    const listaAgendas = await modeloAgendas.find()
  
    // definimos un contador que empiece en 2
    let fila = 2
  
    // agregamos el contenido de la base de datos con un for o un forEach para llamar todos los datos

  
    listaAgendas.forEach(datoagendas => {
      ws.cell(fila, 1).string(datoagendas.manzana).style(contenidoEstilo)
      ws.cell(fila, 2).string(datoagendas.servicio).style(contenidoEstilo)
      ws.cell(fila, 3).string(datoagendas.fecha).style(contenidoEstilo)
      ws.cell(fila, 4).string(datoagendas.correoElectronico).style(contenidoEstilo)

  
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
  