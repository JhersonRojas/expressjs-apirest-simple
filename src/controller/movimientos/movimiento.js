const conexion = require("../../database/conexion");
const control = {};

control.Movimientos = (req, res) => {
    let sql = `select PK_Movimiento, Estado_Mv, Jornada, Cantidad, Fecha_Inicio, id_usuario, Tipo_Elemento,
    telefono, correo, tipo_usuario, nombre, Fk_elemento, correo    
    from  movimiento join elementos on Pk_Elemento = Fk_elemento 
    join usuarios on id_usuario = Fk_usuario where Estado_Mv != 'Cancelado' order by Pk_movimiento desc `;

    conexion.query(sql, (error, datos) => {
        if (error) {
            console.log("Error al conectar a la base de datos" + error);
        } else {
            res.json(datos);
        }
    });
};

control.registrarMovimientoElement = (req, res) => {
    const { estadoPermiso, estadoMovi, joranadaReserva, cantidad, fechaInicio, fechaFin, observacion, instructor, ElementForaneo, userForaneo } = req.body;

    let sql = `insert into movimiento(Estado_permiso, Estado_Mv, Jornada_Reserva, Cantidad, Fecha_Inico, Fecha_fin, Observacion, id_instructor, Fk_elemento, Fk_usuario)
    values('${estadoPermiso}','${estadoMovi}','${joranadaReserva}','${cantidad}', '${fechaInicio}','${fechaFin}','${observacion}','${instructor}','${ElementForaneo}','${userForaneo}')`;

    conexion.query(sql, (error, datos) => {
        if (error) {
            res.send("Error al registrar el  movimiento a la bd" + error);
        } else {
            let mensaje = "El movimiento se registro con exito";
            res.json(mensaje);
        }
    });
};

control.buscarMovimiento = (req, res) => {
    let IdentMovi = req.params.idd;
    let nata = `select * from movimiento where PK_Movimento = ${IdentMovi}`;

    conexion.query(nata, (error, datos) => {
        if (error) {
            console.log("Error al conectar a la base de datos");
        } else {
            res.json(datos);
        }
    });
};

control.eliminaMovimiento = (req, res) => {
    let id_movimiento = req.params.id_Mo;
    let sql = `delete from  movimiento where PK_Movimento = ${id_movimiento}`;

    conexion.query(sql, (error, datos) => {
        if (error) {
            res.send("Error al eliminar el  movimiento de la bd");
        } else {
            res.send("Se elimino el  movimiento de la bd");
        }
    });
};

control.actualizarAmb = (req, resp) => {
    try {
        let { id, estado, jornada, observacion } = req.body;
        let sql = `select * from movimiento where PK_Movimiento = ${id}`;

        conexion.query(sql, async (error, datos) => {
            if (datos.length > 0) {
                let sqla = `update movimiento set Estado_Mv = '${estado}', Jornada ='${jornada}', Observacion = '${observacion}'  where Pk_Movimiento = ${id}`;
                conexion.query(sqla, async (error, datos) => {
                    await resp.send({
                        boolean: "true",
                        datos: datos,
                        mensaje: "Ha cambiado los datos de la reserva de la biblioteca",
                    });
                });
            } else {
                resp.json({
                    mensaje: "Lo siento, este reserva no existe",
                    boolean: "false",
                });
            }
        });
    } catch (error) {
        resp.send(error);
    }
};

control.actualizarProyect = (req, resp) => {
    try {
        let { id, estado, jornada, observacion } = req.body;
        let sql = `select * from movimiento where PK_Movimiento = ${id}`;

        conexion.query(sql, async (error, datos) => {
            console.log(datos.length);
            if (datos.length > 0) {
                let sqlp = `Update movimiento set Estado_Mv = '${estado}', Jornada ='${jornada}', Observacion = '${observacion}'  where Pk_Movimiento = ${id}`;
                conexion.query(sqlp, async (error, datos) => {
                    await resp.send({
                        boolean: "true",
                        datos: datos,
                        mensaje: "Ha cambiado los datos de la reserva de la biblioteca",
                    });
                });
            } else {
                resp.json({
                    mensaje: "Lo siento, este reserva no existe",
                    boolean: "false",
                });
            }
        });
    } catch (error) {
        resp.send(error);
    }
};

module.exports = control;
