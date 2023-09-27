const modeloUsuario = require('../modelos/usuarios.model')

//FUNCIONES CRUD-----------
//registrar usuario 
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

//eliminar Usuario 

exports.eliminarUsuario = async (req, res)=>{
    const id = req.params.id;
    await modeloUsuario.findByIdAndDelete({_id: id})
    res.redirect('/tablaUsuarios')
   
}

//Actualizar Usuario 
exports.actualizarusuario = async (req, res) => {
    const id = { _id: req.body.idnuevo }
    const actu = {
      nombreUsuario: req.body.nombreUsuario,
      correoElectronicoUsuario: req.body.correoElectronicoUsuario,
      ubicacionUsuario: req.body.ubicacionUsuario,
      ocupacionUsuario: req.body.ocupacionUsuario
    }
    console.log(actu)
    await modeloUsuario.findOneAndUpdate(id, actu)
    res.redirect('/tablaUsuarios')
  }

  //Login



  exports.inicioSesion = async (req, res) => {
    try {
      const correo = req.body.correoElectronicoUsuario;
      const contraseña = req.body.contraseñaUsuario;
  
      // Buscar al usuario por su correo electrónico
      const usuario = await modeloUsuario.findOne({ correoElectronicoUsuario: correo });
  
      if (!usuario) {
        // El usuario no existe
        console.log('Usuario no encontrado');
        return res.send('Usuario no encontrado');
      }
  
      // Comprobar la contraseña
      if (usuario.contraseñaUsuario === contraseña) {
        // Contraseña correcta
        console.log('Bienvenido vendedor');
        // Redirigir a la página de inicio o realizar alguna acción de autenticación aquí
        return res.redirect('/');
      } else {
        // Contraseña incorrecta
        console.log('Contraseña incorrecta');
        return res.send('Ingresa la contraseña correcta');
      }
    } catch (error) {
      console.error('Error en inicio de sesión:', error);
      return res.status(500).send('Error en el servidor');
    }
  };
  

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
    const nombreArchivo = 'TablaUsuarios'
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
    const listaUsuarios = await modeloUsuario.find()
  
    // definimos un contador que empiece en 2
    let fila = 2
  
    // agregamos el contenido de la base de datos con un for o un forEach para llamar todos los datos
  
    listaUsuarios.forEach(datoUsuario => {
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
  