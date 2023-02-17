    // <---------------- Importaciones ---------------->
const mysql = require('mysql');

    // <------------- Vinculo con la base de datos ------------->
const conexion = mysql.createConnection (
    // {   host: 'localhost',
    //     user:'root',
    //     password: '',
    //     database: 'orbil_4.8.5' }
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DATABASE
    }
);
        // <-------------- Mensaje de conexión -------------->
conexion.connect((error) => {
    if (error) console.log ("Error al conectarse con una base de datos" + error)
    else console.log ("Conexión establecida con la base de datos");
});

// <------------- Exportación de la conexón ------------->
module.exports = conexion;