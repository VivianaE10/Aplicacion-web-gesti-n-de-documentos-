var express = require("express"); //importa el framework Express
const cors = require("cors"); //importa el paquete CORS para manejar solicitudes entre diferentes orígenes
const sequelize = require("./config/database");

const app = express();

app.use(cors());
app.use(express.json());

//PRUEBA DE CONEXIÓN A LA BASE DE DATOS
sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Conexión a la base de datos exitosa");
  })
  .catch((error) => {
    console.error("❌ Error al conectar a la base de datos:", error);
  });

// aquí luego van las rutas
// app.use('/auth', authRoutes);

module.exports = app;
