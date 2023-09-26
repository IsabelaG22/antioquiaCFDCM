const coneccionBDMongo = require('../configuracion/configuracionBd')

const SchemaEstablecimiento = new coneccionBDMongo.Schema({
    codigo: {
        type: String,
        require: true
    },
    nombre: {
        type: String,
        require: true,
        unique: true
    },
    responsable:{
        type:String,
        require: true
    },
    direccion:{
        type: String,
        require:true
    }
})

const nuevoEstablecimiento = coneccionBDMongo.model('establecimientos', SchemaEstablecimiento) // en esta parte  creamos la coleccion usuarios y le agregamos el esquema usuarios creada anteriormente
module.exports = nuevoEstablecimiento