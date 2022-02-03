require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080

//Importera allt från routes. 
const todoroutes = require('./Routes/routes')
const logger = require('./Middleware/logger')
const headers = require('./Middleware/headers')

app.use( express.json() )

//Model - Databases, SQL, CRUD, validations.
//Controller - Parsing requests, building responses.

//Flytta till middleware? Detta kan bli loggern.
// app.use((req, res, next) => {
//   console.log(`Handling request for ${req.method} ${req.path}`)
//   next()
// })

app.use(logger)

app.use(headers)

//Flytta till middleware? 
// app.use((req, res, next) => {
//   if(req.method == 'POST' && req.headers['content-type'] != 'application/json'){
//     return res.status(400).json({error: 'Missing header Content-Type: application/json'})
//   }
//   next()
// })

//Skickar vidare alla requests till todoroutes. 
app.use(todoroutes)

app.listen(PORT, () => console.log("Running on port " + PORT))
