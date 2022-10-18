
        // <---------------- Importaciones ---------------->         
const express = require('express');
const rutas = express.Router();

        // <----------- Llamado a los controladores ----------->         
const controlUsuarios = require ('../controller/usuarios/usuarios');
	const controlFichas = require ('../controller/usuarios/fichas')
	const controlProgramas = require ('../controller/usuarios/programas')

const controlElementos = require ('../controller/elementos/elementos');
	const controlCategorias = require ('../controller/elementos/categorias');
	const controlLibros = require ('../controller/elementos/libros');
	const controlProyector = require ('../controller/movimientos/proyectores');
	const controlComputador = require ('../controller/elementos/computadores');

const controlMovimiento = require('../controller/movimientos/movimiento');
const controlAmbiente = require('../controller/movimientos/ambiente');




        // <------------------ Elementos ------------------>         
rutas.get('/elementos',controlElementos.elementos)
rutas.post('/elementos/registrar',controlElementos.registrarElementos)
rutas.get('/elementos/buscar/:id',controlElementos.buscarElementos)
rutas.get('/elementos/eliminar/:id',controlElementos.eliminarElementos)

        // <<----------- Libros ------------>>         
	rutas.get('/libros',controlLibros.listarTodo)
	rutas.get('/libros/categorias/:idc',controlLibros.listarPorCates)
	rutas.get('/libros/serial/:id',controlLibros.serial)

        
        // <<--------- Computadores -------->>
	rutas.get('/computadores',controlComputador.listarCompus)
	rutas.get('/computador/canti',controlComputador.cantidadCompus)
	rutas.post('/computador/reservar',controlComputador.reserComputadores)


        
        // <<--------- Proyectores --------->>  
	rutas.get('/proyectores',controlProyector.listarProyector)
	rutas.post('/proyector/reservar',controlProyector.reservarProyector)

	
		

        // <<---------- Categorias --------->>  
	rutas.get('/categorias',controlCategorias.categorias)
	rutas.post('/categorias/registrar',controlCategorias.registrarCategoria)
	rutas.get('/categorias/buscar/:id',controlCategorias.buscarCategoria)
	rutas.get('/categorias/eliminar/:id',controlCategorias.eliminarCategoria)


        // <------------------ Usuarios ------------------>   
rutas.get('/usuarios',controlUsuarios.usuarios)
rutas.post('/login',controlUsuarios.login)
rutas.post('/acceso',controlUsuarios.acceso)
rutas.get('/usuarios/buscar/:id',controlUsuarios.buscarUsuario)


        // <<------------ Fichas ----------->> 
	rutas.get('/fichas',controlFichas.fichas)
	rutas.post('/fichas/registrar',controlFichas.registrarFicha)
	rutas.get('/fichas/buscar/:id',controlFichas.buscarFicha)
	rutas.get('/fichas/eliminar/:id',controlFichas.eliminarFicha)

		// <<----------- Programas --------->>         
	rutas.get('/programas',controlProgramas.programas)
	rutas.post('/programas/registrar',controlProgramas.registrarPrograma)
	rutas.get('/programas/buscar/:id',controlProgramas.buscarPrograma)
	rutas.get('/programas/eliminar/:id',controlProgramas.eliminarPrograma)

        // <------------ Movimientos ------------>     

rutas.get('/movimientos', controlMovimiento.Movimientos);
rutas.post('/insertarMovi', controlMovimiento.registrarMovimientoElement);
rutas.get('/listas/:id', controlMovimiento.buscarMovimiento);
rutas.get('/eliminarMovi/:id_Mo', controlMovimiento.eliminaMovimiento);

	rutas.get('/ambientes', controlAmbiente.listarAmbiente);
	rutas.post('/ambiente/reservar', controlAmbiente.reservarAmbiente);
	rutas.post('/ambiente/actualizar/reserva', controlMovimiento.actualizarAmb)

	rutas.get('/reservas/proyector', controlProyector.reservasPro )
	rutas.post('/proyector/actualizar/reserva', controlMovimiento.actualizarProyect)

	rutas.get('/computador/reservas', controlComputador.reservasComp)

        // <------------ Exportacion del modulo ------------>   
          module.exports = rutas;
		  