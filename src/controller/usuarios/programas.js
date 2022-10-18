
    // <---------------- Controlador ---------------->         
    const conexion = require('../../database/conexion');
    const controlador = {}

    // <---------------- Listar programas ---------------->         
    controlador.programas= (req,res) =>{
   
    let sql = `select * from programa`;
   
    conexion.query(sql,(error,datos)=> {
        if(error){
            console.log('Error al conectar a la base de datos');
        }else{
            res.json(datos);
        }
    })};

    // <---------------- Registrar programas ---------------->         
    controlador.registrarPrograma = (req,res)=> {

    const {ficha, programa} = req.body;

    let sql = `insert into programa(id_programa, nombre_programa)
    values('${ficha}', '${programa}')`;
    
    conexion.query(sql,(error,datos)=> {
        if(error){ res.send('Error al registro el programa a la bd');
        }else{
            let mensaje = 'El programa se registro con exito'
            res.json({mensaje})
        }
    })};

    // <---------------- Buscar un programa ---------------->         
    controlador.buscarPrograma = (req,res) =>{
    let fichaProgram = req.params.id;
    let nata = `select * from programa where id_programa = ${fichaProgram}`;
   
    conexion.query(nata,(error,datos)=> {
        if(error){
            console.log('Error al conectar a la base de datos');
        }else{
            let mensaje = 'RESULTADOS!'
            res.json({mensaje,datos});
        }
    })};

    // <---------------- Eliminar un programa ---------------->         
    controlador.eliminarPrograma = (req,res) =>{

    let id_prog = req.params.id_prog;
    let sql = `delete from programa where id_programa = ${id_prog}`;

     conexion.query(sql,(error,datos)=> {
     if(error){ res.send('Error al eliminar el producto a la bd');
      }else{ 
        
       res.send('Se elimino el programa de la bd');
    }
    })};

    // <---------------- Exportacion del controlador ---------------->         
    module.exports = controlador;