const coneccionBDMongo = require('../../backend/configuracion/configuracionBd')


const SchemaAgendas = new coneccionBDMongo.Schema({
    manzana: {
        type: String,
        require: true
    },
    servicio: {
        type: String,
        require: true,
    },
    fecha: {
        type: Date,
        require: true,
    },
    correoElectronico: {
        type: String,
        require: true,
        unique: true
    }
})

const nuevaAgenda = coneccionBDMongo.model('agendas', SchemaAgendas) // en esta parte  creamos la coleccion usuarios y le agregamos el esquema usuarios creada anteriormente
module.exports = nuevaAgenda