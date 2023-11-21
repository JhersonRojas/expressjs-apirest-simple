// <--------------- Importaciones ---------------->
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

// <--------------- Permisos ---------------->
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
require("dotenv").config({ path: "./src/env/.env" });

// <--------------- Rutas ---------------->
app.use(require("./router/rutas"));

// <--------------- Puerto del server ---------------->
const PORT = 3000;

app.listen(PORT, () => {
  console.log("Servidor en el purto http://localhost:" + PORT);
});
