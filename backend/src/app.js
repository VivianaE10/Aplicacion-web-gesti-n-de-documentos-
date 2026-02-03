require("dotenv").config(); // Carga las variables de entorno desde el archivo .env

var express = require("express"); //importa el framework Express
const cors = require("cors"); //importa el paquete CORS para manejar solicitudes entre diferentes orígenes
const sequelize = require("./config/database");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", require("./routes/auth.routes"));

module.exports = app;
