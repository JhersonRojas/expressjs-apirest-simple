const conexion = require("../../database/conexion");
const controlador = {};

controlador.fichas = (req, res) => {
    const sql = `select * from fichas`;

    conexion.query(sql, (error, datos) => {
        if (error) {
            console.log("Error al conectar a la base de datos");
        } else {
            res.json(datos);
        }
    });
};

controlador.registrarFicha = (req, res) => {
    const { id_ficha, inicio, finalizo, estado, programa } = req.body;

    const sql = `insert into fichas
    (id_ficha, fecha_inicio, fecha_fin, Estado_ficha, fk_id_programa)
    values ('${id_ficha}', '${inicio}', '${finalizo}', '${estado}', '${programa}') `;

    conexion.query(sql, (error, datos) => {
        if (error) {
            res.send("Error al registrar ficha a la bd");
        } else {
            const mensaje = "La ficha se registro con exito";
            res.json({ mensaje });
        }
    });
};

controlador.buscarFicha = (req, res) => {
    const id_ficha = req.params.id;
    const nata = `select * from fichas where id_ficha = ${id_ficha}`;

    conexion.query(nata, (error, datos) => {
        if (error) {
            console.log("Error al conectar a la base de datos");
        } else {
            res.json({ datos });
        }
    });
};

controlador.eliminarFicha = (req, res) => {
    const id_ficha = req.params.id;
    const sql = `delete from fichas where id_ficha = ${id_ficha}`;

    conexion.query(sql, (error, datos) => {
        if (error) {
            res.send("Error al eliminar la ficha de la bd");
        } else {
            res.send("Se elimino la ficha de la bd");
        }
    });
};

module.exports = controlador;
