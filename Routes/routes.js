const express = require('express')
const router = express.Router()

//Importerar alla funktioner från todocontroller.
const todocontroller = require('../Controller/todocontroller')

router.get('/alltodolists', todocontroller.alltodolists )
router.post('/newtodolist', todocontroller.newtodolist)
router.post('/newtodo', todocontroller.newtodo)
router.get('/gettodolists', todocontroller.gettodolist )
router.get('/gettodo', todocontroller.gettodo )
router.patch('/updatetodolist', todocontroller.updatetodolist)
router.patch('/updatetodo', todocontroller.updatetodo)
router.delete('/deletetodolist', todocontroller.deletetodolist)

module.exports = router