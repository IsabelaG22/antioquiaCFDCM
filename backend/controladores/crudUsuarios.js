const modeloUsuario = require('../modelos/usuarios.model')
const { validationResult, cookie } = require('express-validator')
const nodemailer = require('nodemailer')

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
      contraseñaUsuario: req.body.contraseña,
      rol: req.body.rol

    })
    await registrarUsuario.save()

    res.redirect('/')
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
        //Creando cokiee
        
        res.cookie('rol', `${usuario.rol}`, {
          httpOnly: true
        })
        console.log(res.cookie)
        // Contraseña correcta
        console.log('Bienvenido Usuario');
        // Redirigir a la página de inicio 
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
  


// CERRAR SESION

exports.cerrarsesion = async (req, res) => {
  res.clearCookie('rol')
  res.clearCookie('usuario')

  res.redirect('/')

  console.log(cookie)
}


//Actualizar contraseña

// Formulario para recuperar CONTRASEÑA
exports.recuperarContraseña = (req, res) => {
  res.render('../frontend/vistas/usuarios/formularioRecuperarContraseña.ejs');
}

// RECUPERAR CONTRASEÑA
exports.actualizarContrasena = async (req, res) => {
  try {
    const buscarId = await modeloUsuario.findOne({ _id: req.params.id });

    if (!buscarId) {
      // Manejar el caso en el que no se encuentra ningún usuario con el ID proporcionado.
      return res.status(404).send('Usuario no encontrado');
    }

    res.render('../frontend/vistas/usuarios/formularioActualizarContra.ejs', { buscarId });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
}

// ENVIAR CORREO RECUPERAR CONTRASEÑA
exports.rcontrasena = async (req, res) => {
  try {
    const correo = req.body.correoElectronicoUsuario;
    const usuarioA = await modeloUsuario.findOne({ correoElectronicoUsuario: correo });

    if (!usuarioA) {
      // Manejar el caso en el que no se encuentra ningún usuario con el correo proporcionado.
      return res.status(404).send('Correo electrónico no encontrado');
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'igrisales01@misena.edu.co',
        pass: process.env.DB_SEGURA // No es necesario incluir espacios al principio y al final
      }
    });

    const mailOptions = {
      from: 'igrisales01@misena.edu.co',
      to: correo,
      subject: 'Recuperar contraseña',
      text: `Para actualizar la contraseña ingresa aquí: http://localhost:4001/actualizarContrasena/${usuarioA._id}`
    }

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error(error);
        res.status(500).send('Error al enviar el correo');
      } else {
        console.log('Email sent: ' + info.response);
        res.send('Correo enviado correctamente');
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
}

// Actualizar contraseña y guardar en la BD con la información del usuario
exports.nuevaContraseña = async (req, res) => {
  try {
    const id = { _id: req.body.buscarId };
    const actu = {
      contraseñaUsuario: req.body.contrasenaNueva
    }
    await modeloUsuario.findByIdAndUpdate(id, actu);
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
}

//exportar exel

  // GENERAR TABLA EXCEL DE LOS DATOS SOBRE LOS USUARIOS ----------------------------------------

  const xl = require('excel4node')
  const path = require('path')
  const fs = require('fs')
  
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
  