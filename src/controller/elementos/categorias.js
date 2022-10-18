
    // <---------------- Controlador ---------------->    
const conexion = require('../../database/conexion');
const controlador = {}


    // <---------------- Listar categorias ---------------->    
controlador.categorias= (req,res) =>{
   
    let sql = `select * from categorias where Nombre_Categoria != 'Dispositivos'`;
   
    conexion.query(sql,(error,datos)=> {
        if(error){
            console.log('Error al conectar a la base de datos');
        }else{
            res.json(datos);
        }
    })};

    // <---------------- Registrar categorias ---------------->    
controlador.registrarCategoria = (req,res)=> {

    const {IdCategorias, Categoria} = req.body;

    let sql = `insert into categorias(Pk_Categorias, Nombre_Categoria)
    values('${IdCategorias}', '${Categoria}')`;
    
    conexion.query(sql,(error,datos)=> {
        if(error){ res.send('Error al registro la categoria a  la bd');
        }else{
            let mensaje = 'La categoria se registro con exito'
            res.json({mensaje})
        }
    })};

    // <---------------- Buscar una categoria ---------------->    
controlador.buscarCategoria = (req,resp) =>{
    let id = req.params.id;
    let sql = `select * from categorias where Pk_Categorias = ${id}`;
   
    conexion.query(sql, async (error,datos)=> {
        if(error){
            console.log('Error al conectar a la base de datos');
        }else{

            if (datos.lenght > 0){
                let msj = "false"
                resp.json({msj});
            } else {
                let msj = "true"
                resp.json({msj,datos});   
            }
            
        }
    })};

    // <---------------- Eliminar una categoria ---------------->    
controlador.eliminarCategoria = (req,res) =>{

    let id = req.params.id;
    let sql = `delete from categorias where Pk_Categorias = ${id}`;

     conexion.query(sql,(error,datos)=> {
     if(error){ res.send('Error al eliminar categoria');
      }else{ 
       res.send('Se elimino categoria de la bd');
    }
    })};

    // <---------------- Exportación del controlador ---------------->    
    module.exports = controlador;