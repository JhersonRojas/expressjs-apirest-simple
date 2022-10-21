const conexion = require('../../database/conexion');
const control = {}

        // < -- Listar del reservas del ambiente Ambiente -->
    control.listarProyector = (req,res) =>{
   
        let sql = `select Pk_Elemento, Nombre_Elementos, Estado, Nombre_Elementos, 
        Tipo_Elemento from elementos where Tipo_Elemento = 'Proyector'`;
       
        conexion.query(sql, (error,datos)=> {
            if(error){
                console.log('Error al conectar a la base de datos');
            }else{
                res.json(datos);
            }
        })
    }

    control.reservasPro= (req,resp) =>{
        let sql = `select Pk_movimiento, id_usuario, Tipo_Usuario, nombre, telefono, correo, Pk_Elemento, 
        Nombre_Elementos, Jornada, Estado_Mv,Fecha_Inicio, Observacion
        from movimiento  join elementos on Pk_Elemento = Fk_elemento join usuarios on id_usuario = Fk_usuario
        where Tipo_Elemento = 'Proyector' `

        conexion.query(sql, (error,datos) =>{

            try {
                resp.json(datos)
            } catch (error){
                    resp.send(error)
            }
            
        })
    }


    // control.cantiProyector = (req,res) =>{
   
    //     let sql = `select Tipo_elemento, Count('Stock') as total from elementos where Tipo_elemento='computador'`;
       
    //     conexion.query(sql, (error,datos)=> {
    //         let pro = datos[0].total 
    //         let total = Number(pro) - 3 
    //         res.json(total)
    //     })
    // }

    // < -- Reserva del Ambiente con restricción -->

    control.reservarProyector= (req,resp) => {
        let {jornada, fecha, sitio, usuario, serial} = req.body
        let sql = `select Jornada, Fecha_Inicio from movimiento join elementos on Fk_elemento=Pk_Elemento
        where Jornada ='${jornada}' and Fecha_Inicio = '${fecha}' and Fk_Elemento = '${serial}' 
        and Tipo_elemento = 'proyector' and Estado_Mv != 'Cancelado' `;
     
         conexion.query(sql,(error,datos) => {

            if (error) {
                resp.send("error:" + error)
            } else {

                 if ( datos.length > 0 ) {  
                    let boolean = "false"

                     resp.send({mensaje: "No se reservo", boolean})
                     console.log(datos.length)
                                         
                 } else {
    
                      let sqlb = `insert into movimiento( Estado_Mv, Jornada, Cantidad, Sitio_Prestamo, Fecha_Inicio, Fk_elemento,Fk_usuario)
                        VALUES ('Reserva', '${jornada}', 1 ,'${sitio}', '${fecha}','${serial}', ${usuario})`;
                    
                      conexion.query(sqlb,(error,datos)=> {

                          if(error){ 
                              resp.send('Error al reservar el proyector' +  error)
                          }else{
                            let boolean = "true"
                            let correcto = 'El proyector se reservo con exito'
                            resp.json({mensaje:correcto, boolean})
                            }
                     
                    })
                }

            }

     })
};
     
module.exports = control;
