const Usuario = require("./Usuario"); // Importa el modelo Usuario
const Documento = require("./Documento");
const DatoCSV = require("./DatoCSV");

// Define las relaciones entre los modelos
Usuario.hasMany(Documento, { foreignKey: "usuario_id" }); // Un usuario puede tener muchos documentos
Documento.belongsTo(Usuario, { foreignKey: "usuario_id" }); // Un documento pertenece a un usuario

Documento.hasMany(DatoCSV, { foreignKey: "documento_id" }); // Un documento puede tener muchos datos CSV
DatoCSV.belongsTo(Documento, { foreignKey: "documento_id" }); // Un dato CSV pertenece a un documento

module.exports = {
  Usuario,
  Documento,
  DatoCSV,
};
