const coneccionBDMongo = require('../../backend/configuracion/configuracionBd')

const Schemausuarios = new coneccionBDMongo.Schema({
    tipoDocumento: {
        type: String,
        require: true
    },
    documentoUsuario: {
        type: String,
        require: true,
        unique: true
    },
    nombreUsuario: {
        type: String,
        require: true
    },
    apellidoUsuario: {
        type: String,
        require: true
    },
    telefonoUsuario: {
        type: String,

    },
    ubicacionUsuario: {
        type: String
    },
    ciudadUsuario:{
        type:String,
        require:true
    },
    ocupacionUsuario:{
        type:String,
        require:true
    },
    correoElectronicoUsuario: {
        type: String,
        require: true,
        unique: true

    },
    contraseñaUsuario: {
        type: String,
        require: true
    },
    rol:{
        type:String,
        require:true
    }

})

const nuevoUsuario = coneccionBDMongo.model('usuarios', Schemausuarios) // en esta parte  creamos la coleccion usuarios y le agregamos el esquema usuarios creada anteriormente
module.exports = nuevoUsuario