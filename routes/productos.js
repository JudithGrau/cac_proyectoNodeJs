const express = require('express')
const router = express.Router()

const { body } = require('express-validator')

const controller = require('../controllers/productos')

router.get('/', (req,res)=>{
    res.render('Index')
})

// Update
router.get('/productos/:id/edit', controller.edit)
router.put('/productos/update', [
    body('nombre', 'El nombre es obligatorio').notEmpty()
], controller.update) //o patch

router.delete('/productos/:id/delete', controller.destroy)

// Create
router.get('/productos/create', controller.create)
router.post('/productos/store', [
    body('nombre', 'El nombre es obligatorio').notEmpty()
], controller.store)

// READ
router.get('/productos', controller.index)
router.get('/productos/:id', controller.show)

module.exports = router