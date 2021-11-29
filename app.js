require('dotenv').config()

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')//me permite usar otros métodos que no sean el get o post
const session = require('express-session')

//inicializo las cookies
app.use(session({
    secret: 'FV*_54V56yG^B_<5',
    resave: false,//para que no guarde a menos que yo se lo diga
    saveUninitialized: false //para que no guarde algo que no este inicializado
}))

app.set('view engine', 'ejs')
app.use(expressLayouts)

app.use(express.static(__dirname + '/public'))
//config importante: nos permite recibir en el req.body, la informacion del formulario
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))//configuro el midlewarede override

const isLogin = (req, res, next) => {//middleware
    //si no esta iniciada la sesion
    if (!req.session.user_id && req.url != '/login' && req.url != '/register'&& req.url != '/contacto') {
        res.redirect('/login')
    }

    //si esta iniciada la sesion
    next()
}

app.use(isLogin)//le digo que use midleware para todo el sitio(de manera general)

app.get('/', (req, res) => {
    res.render('index')
})

app.use('/', require('./routes/auth'))//ruta de autenticacion
app.use('/', require('./routes/productos'))
app.use('/', require('./routes/contacto'))

app.use((req,res, next)=>{
    res.status(404).send('Not Found')
})

const port = process.env.PORT || 5000

app.listen(port, ()=> console.log(`http://localhost:${port}`))