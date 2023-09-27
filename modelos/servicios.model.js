const coneccionBDMongo = require('../configuracion/configuracionBd')

const SchemaServicios = new coneccionBDMongo.Schema({
    codigo: {
        type: String,
        require: true
    },
    nombre: {
        type: String,
        require: true,
    },
    descripcion:{
        type: String,
        require: true
    }
})

const nuevoServicio = coneccionBDMongo.model('servicios', SchemaServicios
) // en esta parte  creamos la coleccion usuarios y le agregamos el esquema usuarios creada anteriormente
module.exports = nuevoServicio