var express = require("express"); //importa el framework Express
const cors = require("cors"); //importa el paquete CORS para manejar solicitudes entre diferentes orígenes
const sequelize = require("./config/database");

const app = express();

app.use(cors());
app.use(express.json());

// aquí luego van las rutas

app.use("/auth", require("./routes/auth.routes"));

module.exports = app;
