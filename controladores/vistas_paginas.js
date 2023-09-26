const modeloUsuario = require('../modelos/usuarios.model')

exports.index = (req,res)=>{
    res.render('index.ejs')
}

exports.formularioRegistroUsuario =  (req,res)=>{
    res.render('formularioRegistrarUsuario.ejs')
}


exports.registrarUsuario = async (req, res) => {
    console.log('antes')
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
      console.log('hola magola')
  } // funcion para que los datos del ususario sean guardados en ka base de datos y luego los muestre en la respectiva tabla para verlos9