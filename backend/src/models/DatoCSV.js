const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const DatoCSV = sequelize.define(
  "DatoCSV",
  {
    correo: DataTypes.STRING,
    nombre: DataTypes.STRING,
    telefono: DataTypes.BIGINT,
    ciudad: DataTypes.STRING,
    notas: DataTypes.TEXT,
  },
  {
    tableName: "datos_csv",
    timestamps: false,
  },
);

module.exports = DatoCSV;
