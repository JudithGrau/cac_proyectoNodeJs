require('dotenv').config()

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')

app.set('view engine', 'ejs')
app.use(expressLayouts)

app.use(express.static(__dirname + '/public'))
//config importante: nos permite recibir en el req.body, la informacion del formulario
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))

app.use('/', require('./routes/productos'))
app.use('/', require('./routes/contacto'))

app.use((req,res, next)=>{
    res.status(404).send('Not Found')
})

const port = process.env.PORT || 5000

app.listen(port, ()=> console.log(`http://localhost:${port}`))