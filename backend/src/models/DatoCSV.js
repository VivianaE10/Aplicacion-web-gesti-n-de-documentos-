//implemetamos el endpoind para guardar los datos del CSV en la base de datos
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const DatoCSV = sequelize.define(
  "DatoCSV",
  {
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING, //colocar el telefono como un string para permitir formatos variados
      allowNull: false,
      validate: {
        isNumeric: true,
      },
    },
    ciudad: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    notas: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "datos_csv",
    timestamps: false,
  },
);

module.exports = DatoCSV;
