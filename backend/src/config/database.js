// estamos usando Sequelize como ORM para conectarnos a la base de datos y configurar las variables de entorno con las credenciales.
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME || "gestion_documentos",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: process.env.DB_DIALECT || "mysql",
  },
);

module.exports = sequelize;
