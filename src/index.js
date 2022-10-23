
        // <---------------- Importaciones ---------------->
const express = require('express');
const morgan = require ('morgan');
const cors = require('cors');
require('dotenv').config({path:'./src/env/.env'});
const app = express();

        // <--------------- Puerto del server --------------->
        puerto = 3100;
app.listen(puerto,() => {
console.log("Servidor en el purto http://localhost:3100/")});

        // <---------------- Permisos ---------------->
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

        // <---------------- Rutas ---------------->
app.use(require('./router/rutas'))

        // <---------------- Test ---------------->
app.get('/', (req,resp) => {
        resp.send("El servidor se inicio con exito")
})
 