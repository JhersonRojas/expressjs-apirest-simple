const mysql = require('mysql');
require('dotenv').config({ path: './src/env/.env' });

const conexion = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
});

conexion.connect((error) => {
    if (error) console.log('Error al conectarse con una base de datos' + error);
    else console.log('Conexión establecida con la base de datos');
});

module.exports = conexion;
