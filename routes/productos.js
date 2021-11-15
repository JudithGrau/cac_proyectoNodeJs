const express = require('express')
const router = express.Router()

const productos = require('../productos')

router.get('/', (req,res)=>{
    res.render('Index')
})

router.get('/productos', (req,res)=>{
    /* console.log(productos.all()); */
    res.render('productos/index', { productos: productos.all() })
})

router.get('/productos/:id', (req,res)=>{
    res.render('productos/show',{ producto: productos.find(req.params.id) } )
})

module.exports = router