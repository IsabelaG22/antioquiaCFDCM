const coneccionBDMongo = require('../configuracion/configuracionBd')

const SchemaMunicipio = new coneccionBDMongo.Schema({
    nombreMunicipio: {
        type: String,
        require: true
    },
    numeroManzanas: {
        type: String,
        require: true,
    }
})

const nuevoMunicipio = coneccionBDMongo.model('municipios', SchemaMunicipio) // en esta parte  creamos la coleccion usuarios y le agregamos el esquema usuarios creada anteriormente
module.exports = nuevoMunicipio