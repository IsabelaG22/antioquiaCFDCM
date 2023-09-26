const coneccionBDMongo = require('../configuracion/configuracionBd')

const SchemaManzanas = new coneccionBDMongo.Schema({
    codigo: {
        type: String,
        require: true
    },
    nombre: {
        type: String,
        require: true,
        unique: true
    },
    localidad:{
        type:String,
        require: true
    },
    direccion:{
        type: String,
        require:true
    },
    tipoServicio:{
        type:String,
        require:true
    },
    categoriaServicio:{
        type: String,
        require: true
    }
})

const nuevaManzana = coneccionBDMongo.model('manzanas', SchemaManzanas) // en esta parte  creamos la coleccion usuarios y le agregamos el esquema usuarios creada anteriormente
module.exports = nuevaManzana