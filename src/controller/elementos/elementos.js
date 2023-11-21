const conexion = require("../../database/conexion");
const controlador = {};

controlador.elementos = (req, res) => {
    const sql = `select * from  elementos`;

    conexion.query(sql, (error, datos) => {
        if (error) {
            console.log("Error al conectar a la base de datos");
        } else {
            res.json(datos);
        }
    });
};

controlador.registrarElementos = (req, res) => {
    const { serial, estado, imagen, nombre, autor, descripcion, tipoElemento, stock, categoria } = req.body;

    const sql = `insert into elementos (Pk_Elemento,Estado,Imagen,Nombre_Elementos, Autor,Descripcion,Tipo_Elemento,Stock,Fk_Categorias)
        values ('${serial}', '${estado}', '${imagen}', '${nombre}', '${autor}', '${descripcion}', '${tipoElemento}','${stock}','${categoria}')`;

    conexion.query(sql, (error, datos) => {
        if (error) {
            res.send("Error al registrar el elemento");
        } else {
            let mensaje = "El  elemento se registro con exito";
            res.json({ mensaje });
        }
    });
};

controlador.buscarElementos = (req, res) => {
    const serial = req.params.id;
    const sql = `select * from elementos where Pk_Elemento = ${serial}`;

    conexion.query(sql, (error, datos) => {
        if (error) {
            console.log("Error al conectar a la base de datos");
        } else {
            res.json(datos);
        }
    });
};

controlador.eliminarElementos = (req, res) => {
    const serial = req.params.id_El;
    const sql = `delete from  elementos where Pk_Elemento = ${serial}`;

    conexion.query(sql, (error, datos) => {
        if (error) {
            res.send("Error al eliminar el  elemento de la bd");
        } else {
            res.send("Se elimino el  elemento de la bd");
        }
    });
};

module.exports = controlador;
