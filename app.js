const express = require('express')
const app = express()
const PORT = 3000
const path = require('path')

//Configuracion para la lectura de formularios y archivos json
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

// Se define la carpeta 'public' para archivos estaticos
app.use(express.static(path.resolve(__dirname,'public')))
app.use(express.json())

// Configuracion dotenv
const dotenv = require('dotenv')
dotenv.config()

//Config. de template engine: EJS
app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname,'src/views'))

//Config. de motor de plantillas
const expressEjsLayouts = require('express-ejs-layouts')
app.use(expressEjsLayouts)
app.set('layout', 'layouts/mainLayout')

/* Importacion routers */
const mainRouter = require('./src/routers/mainRouter')
const shopRouter = require('./src/routers/shopRouter')
const authRouter = require('./src/routers/authRouter')
const adminRouter = require('./src/routers/adminRouter')
const cartRouter = require('./src/routers/cartRouter')
const apiRouter = require('./src/routers/apiRouter')
const userPanelRouter = require('./src/routers/userPanelRouter')

/* Routers */
app.use('/', mainRouter)
app.use('/auth', authRouter)
app.use('/admin', adminRouter)
app.use('/userPanel', userPanelRouter)
app.use('/shop', shopRouter)
app.use('/cart',cartRouter)
app.use('/api', apiRouter)
app.use('',(req,res) => {res.render('pages/main/notfound',{page:{title:'404 - Pagina no encontrada'}})})


app.listen(PORT,() => {
    console.log(`Serever: http://localhost:${PORT}`)
})