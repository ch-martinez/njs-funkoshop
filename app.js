const express = require('express')
const app = express()
const PORT = 3000
const path = require('path')

// Se define la carpeta 'public' para archivos estaticos
app.use(express.static(path.resolve(__dirname,'public')))
app.use(express.json())

app.get('/', (req,res) => {
    res.send('Corriendo sv')
})

app.listen(PORT,() => {
    console.log(`Serever: http://localhost:${PORT}`)
})