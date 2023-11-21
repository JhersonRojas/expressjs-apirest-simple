const conexion = require("../../database/conexion");
const jwt = require("jsonwebtoken");
const controlador = {};

controlador.usuarios = (req, res) => {
    const sql = `select * from usuarios`;

    conexion.query(sql, (error, datos) => {
        if (error) console.log("Error al constultar la base de datos");
        else res.json(datos);
    });
};

controlador.acceso = (req, resp) => {
    const { user, pass } = req.body;
    const sql = `select id_usuario, Nombre,tipo_usuario, clave from usuarios where id_usuario = ${user} and clave = '${pass}'`;

    conexion.query(sql, (error, datos) => {
        if (datos == "") resp.json(`Acceso denegado`);
        else resp.send(datos);
        console.log(datos.length);
    });
};

controlador.buscarUsuario = (req, res) => {
    const id_usuarios = req.params.id;
    const sql = `select * from usuarios where id_usuario = ${id_usuarios}`;

    conexion.query(sql, (error, datos) => {
        if (error) console.log("Error al conectar a la base de datos");
        else res.json(datos);
    });
};

controlador.login = async (req, resp) => {
    try {
        const { user, pass } = req.body;

        const sql = `select id_usuario, Nombre,tipo_usuario, clave from usuarios where id_usuario = '${user}' and clave = '${pass}'`;
        const Good = "true";
        const bad = "false";

        conexion.query(sql, (error, results) => {
            if (results.length > 0) {
                const token = jwt.sign({ user: results }, process.env.AUTH_SECRET, {
                    expiresIn: process.env.AUTH_EXPIRES,
                });
                resp.status(200).send({ user: results, token: token, booleano: Good });
            } else resp.send({ booleano: bad });
        });
    } catch (error) {
        console.log(error);
    }
};

controlador.token = (req, res, nex) => {
    const tokenUsuario = req.headers["token"];
    if (!tokenUsuario)
        return res
            .status(402)
            .json({ autorizado: false, mensaje: "El token es requerido" });

    const decoded = jwt.verify(
        tokenUsuario,
        process.env.AUTH_SECRET,
        (error, decoded) => {
            if (error)
                return res.json({
                    autorizado: false,
                    mensaje: "El token no es correcto",
                });
            else nex();
        }
    );
};

module.exports = controlador;
