//estamos definiendo el modelo (tabla) de Usuario con Sequelize
const { DataTypes } = require("sequelize"); //DataTypes nos permite definir los tipos de datos de cada campo
const sequelize = require("../config/database");

const Usuario = sequelize.define(
  "Usuario",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    contrasena: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rol: {
      type: DataTypes.ENUM("usuario", "admin"), // enum me define dos valores usuario o admin
      defaultValue: "usuario",
    },
  },
  {
    tableName: "usuarios", //mapiamos el modelo a la tabla usuarios
    timestamps: true, //crea automaticamente los campos de createdAt y updatedAt
    createdAt: "fecha_creacion", //crea el campo fecha_creacion en lugar de createdAt
    updatedAt: "fecha_actualizacion", // se crea el campo fecha_actualizacion en lugar de updatedAt
  },
);

module.exports = Usuario;
