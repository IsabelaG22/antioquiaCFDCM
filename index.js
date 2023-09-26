const express = require ('express')
const morgan = require('morgan')
const app = express()

app.use(morgan('dev'))

PORT=3000
app.listen(PORT, ()=>{
    console.log('Conectado en el puerto 3000')
})

app.get('/', (req, res)=>{
    res.send('HOLA MUNDO')
})