const modeloManzanas = require('../modelos/manzanas.model')

//FUNCIONES CRUD-----------
//registrar manzanas 
exports.registrarManzana = async (req, res) => {
    const registrarManzana = new modeloManzanas({
        codigo: req.body.Codigo,
      nombre: req.body.Nombre,
      localidad: req.body.Localidad,
      direccion: req.body.Direccion,
      tipoServicio: req.body.Tipo,
      categoriaServicio: req.body.Categoria
    })
    await registrarManzana.save()

    res.redirect('/tablaManzanas')
    console.log(registrarManzana)
} // funcion para que los datos del manzanas sean guardados en la base de datos 

//eliminar manzanas 

exports.eliminarManzana = async (req, res)=>{
    const id = req.params.id;
    await modeloManzanas.findByIdAndDelete({_id: id})
    res.redirect('/tablaManzanas')
   
}

//Actualizar manzanas 
exports.actualizarManzana = async (req, res) => {
    const id = { _id: req.body.idnuevo }
    const actu = {
        codigo: req.body.Codigo,
      nombre: req.body.Nombre,
      localidad: req.body.Localidad,
      direccion: req.body.Direccion,
      tipoServicio: req.body.Tipo,
      categoriaServicio: req.body.Categoria
    }
    console.log(actu)
    await modeloManzanas.findOneAndUpdate(id, actu)
    res.redirect('/tablaManzanas')

  }

  //Login


//exportar exel

  // GENERAR TABLA EXCEL DE LOS DATOS SOBRE LAS MANZANAS ----------------------------------------

  const xl = require('excel4node')
  const path = require('path')
  const fs = require('fs')
  const multer = require('multer')
  
  exports.descargarExcel = async (req, res) => {
    // configuramos el excel4node
  
    // creamos un nuevo documento
    const wb = new xl.Workbook()
    // definimos el nombre con el cual se descargara el archivo
    const nombreArchivo = 'tablaManzanas'
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
    ws.cell(1, 1).string('codigo').style(columnaEstilo)
    ws.cell(1, 2).string('nombre').style(columnaEstilo)
    ws.cell(1, 3).string('localidad').style(columnaEstilo)
    ws.cell(1, 4).string('direccion').style(columnaEstilo)
    ws.cell(1, 5).string('tipo servicio').style(columnaEstilo)
    ws.cell(1, 6).string('categoria servicio').style(columnaEstilo)

  
    // llamamos a la base de datos
    const listaManzanas = await modeloManzanas.find()
  
    // definimos un contador que empiece en 2
    let fila = 2
  
    // agregamos el contenido de la base de datos con un for o un forEach para llamar todos los datos

  
    listaManzanas.forEach(datomanzanas => {
      ws.cell(fila, 1).string(datomanzanas.codigo).style(contenidoEstilo)
      ws.cell(fila, 2).string(datomanzanas.nombre).style(contenidoEstilo)
      ws.cell(fila, 3).string(datomanzanas.localidad).style(contenidoEstilo)
      ws.cell(fila, 4).string(datomanzanas.direccion).style(contenidoEstilo)
      ws.cell(fila, 5).string(datomanzanas.tipoServicio).style(contenidoEstilo)
      ws.cell(fila, 6).string(datomanzanas.categoriaServicio).style(contenidoEstilo)

  
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
  