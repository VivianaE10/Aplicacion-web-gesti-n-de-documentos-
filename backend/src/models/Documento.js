const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Documento = sequelize.define(
  "Documento",
  {
    nombre_original: DataTypes.STRING,
    nombre_guardado: DataTypes.STRING,
    cantidad_registros: DataTypes.INTEGER,
    usuario_id: DataTypes.INTEGER,
    fecha_carga: DataTypes.DATE,
  },
  {
    tableName: "documentos",
    timestamps: false,
  },
);

module.exports = Documento;
