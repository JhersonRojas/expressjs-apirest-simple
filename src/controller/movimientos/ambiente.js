const conexion = require("../../database/conexion");
const control = {};

control.listarAmbiente = (req, res) => {
    const sql = `select Estado_Mv, Jornada, Cantidad, Fecha_Inicio, Observacion, Pk_Elemento, Tipo_Elemento, 
                    id_usuario, nombre, Tipo_Usuario, correo, Pk_movimiento, telefono from  movimiento 
                    join elementos on Pk_Elemento = Fk_elemento
                    join usuarios on id_usuario = Fk_usuario where Tipo_elemento= 'Ambiente'`;

    conexion.query(sql, (error, datos) => {
        if (error) {
            console.log("Error al conectar a la base de datos");
        } else {
            res.json(datos);
            console.log(datos);
        }
    });
};

control.reservarAmbiente = (req, resp) => {
    let { jornada, fecha, usuario } = req.body;
    const sql = `select Jornada, Fecha_Inicio from movimiento
            where Jornada ='${jornada}' and Fecha_Inicio = '${fecha}' and Estado_Mv = 'Reserva'`;

    try {
        conexion.query(sql, (error, datos) => {
            if (error) {
                resp.send(error);
            } else {
                if (datos.length > 0) {
                    let boolean = "false";

                    resp.send({ mensaje: "No se inserto", boolean });
                    console.log("Fallaron al reservar un ambiente");
                } else {
                    const sqlb = `insert into movimiento( Estado_Mv, Jornada, Cantidad, Fecha_Inicio, Fk_elemento,Fk_usuario)
                                        VALUES ('Reserva', '${jornada}', 1 , '${fecha}',1, ${usuario})`;

                    conexion.query(sqlb, (error, datos) => {
                        if (error) {
                            resp.send("Error al registrar al reservar el ambiente" + error);
                        } else {
                            let boolean = "true";
                            let correcto = "El ambiente se reservo con exito";
                            resp.json({ mensaje: correcto, boolean });
                            console.log("Alguien reservo la biblioteca");
                        }
                    });
                }
            }
        });
    } catch (error) {
        resp.send({ error: error });
    }
};

module.exports = control;
