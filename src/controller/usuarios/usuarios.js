
        // <---------------- Controlador ---------------->    
const conexion = require('../../database/conexion')
const jwt = require('jsonwebtoken')

const controlador = {}

        // <---------------- Listar usuarios ---------------->         
controlador.usuarios = (req,res) => {
    let sql = `select * from usuarios` ;

    conexion.query(sql,(error,datos) => {
        if ( error ) {
            console.log ('Error al constultar la base de datos')
        } else {
            res.json (datos);
        }
    })}; 

         // <---------------- Validar acceso con toso los datos ---------------->         
controlador.acceso= (req,resp) => {
   let {user, pass} = req.body
   let sql = `select id_usuario, Nombre,tipo_usuario, clave from usuarios
    where id_usuario = ${user} and clave = '${pass}'`;

   conexion.query(sql,(error,datos) => {

       if ( datos == "" ) { resp.json(`Acceso denegado`) }
       else { 
        resp.send(datos)
        console.log(datos.length)

        }

   })};


controlador.buscarUsuario = (req,res) =>{
    let id_usuarios = req.params.id;
    let sql = `select * from usuarios where id_usuario = ${id_usuarios}`;
       
     conexion.query(sql,(error,datos)=> {
         if(error){
            console.log('Error al conectar a la base de datos');
            }else{
            res.json(datos); 
        }
    })};
    
         // <---------------- Validar acceso ---------------->         
controlador.login = async (req,resp) => {

    try {
        let {user,pass}  = req.body;
      
        let sql = `select id_usuario, Nombre,tipo_usuario, clave from usuarios
        where id_usuario = '${user}' and clave = '${pass}'`;   
        console.log("datos:",user, pass) 

        let Good = "true";       let bad ="false"; 

        conexion.query(sql, (error, results) => {
            if ( results.length > 0) {
                let token = jwt.sign({user:results}, process.env.AUTH_SECRET, {expiresIn: process.env.AUTH_EXPIRES});
                resp.status(200).send({user:results,token:token,booleano:Good}); 
            }else {
                resp.send({booleano:bad})   
            }
        });
    } catch (error){
        console.log(error)
    }};
    
            // <---------------- Validar Token ---------------->  
    
controlador.token = (req, res, nex) => {
    let tokenUsuario = req.headers['token'];
    if (!tokenUsuario) return res.status(402).json({autorizado: false, mensaje: 'El token es requerido'});
    
    const decoded = jwt.verify(tokenUsuario,process.env.AUTH_SECRET, (error, decoded) => {
        if(error)
            return res.json({autorizado: false, mensaje: 'El token no es'});
        else nex()
    })};

    // <---------------- Exportacion del controlador ---------------->         
module.exports = controlador;