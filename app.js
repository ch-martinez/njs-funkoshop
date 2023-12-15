const express = require('express')
const app = express()
const PORT = 3000
const path = require('path')

// Se define la carpeta 'public' para archivos estaticos
app.use(express.static(path.resolve(__dirname,'public')))
app.use(express.json())

//Config. de template engine: EJS
app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname,'src/views'))

//Config. de motor de plantillas
const expressEjsLayouts = require('express-ejs-layouts')
app.use(expressEjsLayouts)
app.set('layout', 'layouts/mainLayout')

/* Importacion routers */
const mainRouter = require('./src/routers/mainRouter')


/* Routers */
app.use('/', mainRouter)


app.listen(PORT,() => {
    console.log(`Serever: http://localhost:${PORT}`)
})