
    // <---------------- Controlador ---------------->    
    const conexion = require('../../database/conexion');
    const controlador = {}

    // <---------------- Listar fichas ---------------->    
    controlador.fichas= (req,res) =>{
   
    let sql = `select * from fichas`;
   
    conexion.query(sql,(error,datos)=> {
        if(error){
            console.log('Error al conectar a la base de datos');
        } else {
            res.json(datos);
        }
    })};

    // <---------------- Regristrar fichas ---------------->    
    controlador.registrarFicha = (req,res)=> {

    const {id_ficha, inicio, finalizo, estado, programa} = req.body;

    let sql = `insert into fichas
    (id_ficha, fecha_inicio, fecha_fin, Estado_ficha, fk_id_programa)
    values ('${id_ficha}', '${inicio}', '${finalizo}', '${estado}', '${programa}') `;
    
    conexion.query(sql,(error,datos)=> {

        if(error){ res.send('Error al registrar ficha a la bd');
        } else {
            let mensaje = 'La ficha se registro con exito'
            res.json({mensaje})
        }
    })};

    // <---------------- Controlador ---------------->    
    controlador.buscarFicha = (req,res) =>{
    let id_ficha = req.params.id;
    let nata = `select * from fichas where id_ficha = ${id_ficha}`;
   
    conexion.query(nata,(error,datos)=> {
        if(error){
            console.log('Error al conectar a la base de datos');
        }else{
        
            res.json({datos});
        }
    })};

    // <---------------- Controlador ---------------->    
    controlador.eliminarFicha = (req,res) =>{

    let id_ficha = req.params.id;
    let sql = `delete from fichas where id_ficha = ${id_ficha}`;

     conexion.query(sql,(error,datos)=> {
        	
        if(error){ res.send('Error al eliminar la ficha de la bd');
        } else { 
        res.send('Se elimino la ficha de la bd');
        }
    })};

    // <------------- Exportación del controlador ------------->    
    module.exports = controlador;