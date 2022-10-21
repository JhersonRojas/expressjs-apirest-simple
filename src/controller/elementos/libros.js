        
        // <---------------- Controlador ---------------->         
const { query } = require('express');
const conexion = require('../../database/conexion')
const controlador = {}

        // <------------- Listar todo los libros ------------->         
controlador.listarTodo = (req,res) => {
    
    let sql = `select * from elementos where Tipo_Elemento='Libros'`;

    conexion.query(sql,(error,datos) => {

        if ( error ) {
            console.log ('Error al constultar la base de datos')
        } else {
            res.json (datos);
        } 
    });
} 

controlador.listarPorCates = (req,resp) => {

    let categorias = req.params.idc; 
    
    let sql = `select Pk_Elemento, Nombre_Elementos, Nombre_Categoria, Imagen,  Autor, Descripcion, Stock from elementos join categorias on Fk_Categorias = Pk_Categorias
    where Tipo_Elemento ='Libros' and Pk_Categorias=${categorias} and Estado = 'Disponible'`;


    conexion.query(sql, async (error,datos) => {

        if ( error ) {
             console.log ('Error al constultar la base de datos')
        } else {
            
            if (datos.length > 0){

                if ( datos == "" ){
                    let msj = "false"
                    await resp.json({msj, datos: []});  
                } else {
                    let msj = "true"
                    await resp.json({msj,datos});  
                }
                
            } else {
                let msj = "false"
                await resp.json({msj, datos: []});        
            }
        } 
    });
} 



        // <------------ Listar ibros por serial ------------>         
controlador.serial = (req,res) => {
    let serial = req.params.id
    let sql = `select Nombre_Elementos, Pk_Elemento, Imagen, Autor, Descripcion 
    from elementos where Pk_Elemento = ${serial}`;

    conexion.query(sql,(error,datos) => {

        if ( error ) {
            console.log ('Error al constultar la base de datos')
        } else {
            res.json (datos);
        }
    });
} 

controlador.reserLibros = (req,resp) =>{

    try{
        
        let { fecha, usuario, serial } = req.body

        let sql = `select * from elementos where Pk_Elemento = '${serial}' and Estado = 'No_Disponible' ` 

        let sqlr =  `Update elementos set Estado = 'No_Disponible' where Pk_Elemento = '${serial}'` 
        
        let sqlc = `insert into movimiento(Estado_Mv, Cantidad, Fecha_Inicio, Fk_elemento, Fk_usuario) 
        values ('Solicitud', 1 , '${fecha}', '${serial}', ${usuario})`

        conexion.query(sql,(error,datos) =>{
            if(error){
                resp.send(error)

            } else{

                if(datos.length > 0){

                    let boolean = "false"

                    resp.send({mensaje: "El libro no esta disponible", boolean})
                    console.log("Fallaron al reservar un libro") 

                } else {

                    
                    conexion.query(sqlr, async(error,datos)=> { 
                    
                        if(error){
                            resp.send(error);
                            console.log("Ocurrio un error en la reserva de un libro")
                        
                        }
                    })

                    conexion.query(sqlc,(error,datos2)=> { 

                        if(error){ 
                            resp.send(error);
                            console.log('Error al conectar a la base de datos', error);
                            }
                    })

                    let boolean = "true"
                    let correcto = 'El libro se reservo con exito'
                    resp.json({mensaje:correcto, boolean})

                }
                
            }
        })

    } catch (error){
        console.log("Exploto la reserva de los libros")
    }
};

     // <------------- Exportación del controlador ------------->         
        module.exports = controlador; 