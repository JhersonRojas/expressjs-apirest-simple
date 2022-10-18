        
        // <---------------- Controlador ---------------->         
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
    
    let sql = `select Pk_Elemento, Nombre_Elementos, Nombre_Categoria, Imagen,  Autor, Descripcion, Stock from elementos join  categorias on Fk_Categorias = Pk_Categorias
    where Tipo_Elemento ='Libros' and Pk_Categorias=${categorias}`;


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

     // <------------- Exportación del controlador ------------->         
        module.exports = controlador; 