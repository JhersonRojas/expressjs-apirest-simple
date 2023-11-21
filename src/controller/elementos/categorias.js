const conexion = require("../../database/conexion");
const controlador = {};

controlador.categorias = (req, res) => {
    const sql = `select * from categorias where Nombre_Categoria != 'Dispositivos'`;

    conexion.query(sql, (error, datos) => {
        if (error) {
            console.log("Error al conectar a la base de datos");
        } else {
            res.json(datos);
        }
    });
};

controlador.registrarCategoria = (req, res) => {
    const { IdCategorias, Categoria } = req.body;

    const sql = `insert into categorias(Pk_Categorias, Nombre_Categoria) values('${IdCategorias}', '${Categoria}')`;

    conexion.query(sql, (error, datos) => {
        if (error) {
            res.send("Error al registro la categoria a  la bd");
        } else {
            const mensaje = "La categoria se registro con exito";
            res.json({ mensaje });
        }
    });
};

controlador.buscarCategoria = (req, resp) => {
    const id = req.params.id;
    const sql = `select * from categorias where Pk_Categorias = ${id}`;

    conexion.query(sql, async (error, datos) => {
        if (error) {
            console.log("Error al conectar a la base de datos");
        } else {
            if (datos.lenght > 0) {
                const msj = "false";
                resp.json({ msj });
            } else {
                const msj = "true";
                resp.json({ msj, datos });
            }
        }
    });
};

controlador.eliminarCategoria = (req, res) => {
    const id = req.params.id;
    const sql = `delete from categorias where Pk_Categorias = ${id}`;

    conexion.query(sql, (error, datos) => {
        if (error) {
            res.send("Error al eliminar categoria");
        } else {
            res.send("Se elimino categoria de la bd");
        }
    });
};

module.exports = controlador;
