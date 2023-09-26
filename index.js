const express = require ('express')
const morgan = require('morgan')
const app = express()
const path= require('path')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'vistas'))
app.use(morgan('dev'))

PORT=3000
app.listen(PORT, ()=>{
    console.log('Conectado en el puerto 3000')
})


const rutas = require('./rutas/enrrutamiento')
app.use('/', rutas)