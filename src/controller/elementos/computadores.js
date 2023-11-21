const conexion = require('../../database/conexion');
const control = {};

control.listarCompus = (req, res) => {
    const sql = `select Pk_Elemento, Nombre_Elementos, Estado, Nombre_Elementos, Tipo_Elemento, Descripcion 
                from elementos where Tipo_Elemento = 'Computador' and Pk_Elemento != '2'`;

    conexion.query(sql, (error, datos) => {
        if (error) {
            console.log('Error al conectar a la base de datos');
        } else {
            res.json(datos);
        }
    });
};

control.cantidadCompus = (req, resp) => {
    const sql = `select Tipo_elemento, Count('Stock') as total from elementos where Tipo_elemento='Computador'`;

    const disponibles = `select Tipo_elemento, Count('Stock') as total from elementos where Tipo_elemento='Computador' and Estado ='Disponible'`;

    const exhibidos = `select Nombre_Elementos, Tipo_elemento, Stock from elementos where Pk_elemento = '2'`;

    try {
        conexion.query(sql, async (error, datos) => {
            const pro = datos[0].total;
            const totalCompus = Number(pro) - 1;

            conexion.query(disponibles, async (error, datos2) => {
                const totalCompusDisp = datos2[0].total;

                conexion.query(exhibidos, async (error, datos3) => {
                    const cantidadEnseñada = datos3[0].Stock;

                    await resp.json({
                        cantidad_Computadores: totalCompus,
                        compus_disponibles: totalCompusDisp,
                        cantidad_exhibida: cantidadEnseñada,
                    });
                });
            });
        });
    } catch (error) {
        resp.send(error);
    }
};

control.reserComputadores = (req, resp) => {
    const { fecha, usuario, cantidad } = req.body;

    const sql = `select Nombre_Elementos, Tipo_elemento, Stock from elementos where Pk_elemento = '2'`;

    const newStock = `Update elementos set Stock = (Stock - ${cantidad}) where Pk_Elemento = '2'`;

    const sqlc = `insert into movimiento( Estado_Mv, Cantidad, Fecha_Inicio, Fk_elemento, Fk_usuario)   
                values ('Solicitud', ${cantidad}, '${fecha}', '2', ${usuario}) `;

    conexion.query(sql, (error, datos) => {
        if (error) {
            resp.send(error);
            console.log('Ocurrio un error en la consulta');
        } else {
            if (cantidad >= 1 && cantidad < datos[0].Stock) {
                conexion.query(newStock, async (error, datos2) => {
                    if (error) {
                        resp.send('Error al conectar a la base de datos', error);
                    } else {
                        const final = datos[0].Stock - cantidad;
                        await resp.json({
                            msj: 'El computador se reservo con exito',
                            Disponibles: final,
                        });
                    }
                });

                conexion.query(sqlc, async (error, datos3) => {
                    if (error) {
                        resp.send('Error al conectar a la base de datos', error);
                    } else {
                        console.log('Se ha realizado la reserva de un computador');
                    }
                });
            } else {
                resp.send({
                    estado: false,
                    msj: 'Lo siento, debe elegir una cantidad valida',
                });
            }
        }
    });
};

control.reservasComp = (req, resp) => {
    const sql = `select Pk_movimiento, id_usuario, Tipo_Usuario, nombre, telefono, correo, Pk_Elemento, Nombre_Elementos, Jornada, Estado_Mv, Fecha_Inicio, Observacion
                from movimiento join elementos on Pk_Elemento = Fk_elemento join usuarios on id_usuario = Fk_usuario where Tipo_Elemento = 'Computador' `;

    conexion.query(sql, (error, datos) => {
        try {
            resp.json(datos);
        } catch (error) {
            resp.send(error);
        }
    });
};

module.exports = control;
