const conexion = require("../../database/conexion");
const controlador = {};

controlador.programas = (req, res) => {
    const sql = `select * from programa`;

    conexion.query(sql, (error, datos) => {
        if (error) {
            console.log("Error al conectar a la base de datos");
        } else {
            res.json(datos);
        }
    });
};

controlador.registrarPrograma = (req, res) => {
    const { ficha, programa } = req.body;

    const sql = `insert into programa(id_programa, nombre_programa)
    values('${ficha}', '${programa}')`;

    conexion.query(sql, (error, datos) => {
        if (error) {
            res.send("Error al registro el programa a la bd");
        } else {
            const mensaje = "El programa se registro con exito";
            res.json({ mensaje });
        }
    });
};

controlador.buscarPrograma = (req, res) => {
    const fichaProgram = req.params.id;
    const nata = `select * from programa where id_programa = ${fichaProgram}`;

    conexion.query(nata, (error, datos) => {
        if (error) {
            console.log("Error al conectar a la base de datos");
        } else {
            const mensaje = "RESULTADOS!";
            res.json({ mensaje, datos });
        }
    });
};

controlador.eliminarPrograma = (req, res) => {
    const id_prog = req.params.id_prog;
    const sql = `delete from programa where id_programa = ${id_prog}`;

    conexion.query(sql, (error, datos) => {
        if (error) {
            res.send("Error al eliminar el producto a la bd");
        } else {
            res.send("Se elimino el programa de la bd");
        }
    });
};

module.exports = controlador;
