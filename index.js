const express = require ('express')
const morgan = require('morgan')
const app = express()
const path= require('path')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

app.use(express.json())
app.use(express.urlencoded({ extended: true })) 

app.use('/estaticas', express.static('estaticas'))

const cookieParser = require('cookie-parser')
app.use(cookieParser())

dotenv.config()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'vistas'))
app.use(morgan('dev'))

PORT=4001 

app.listen(PORT, ()=>{
    console.log('Conectado en el puerto: ' + PORT)
})


const rutas = require('./backend/rutas/enrutamiento')
app.use('/', rutas)