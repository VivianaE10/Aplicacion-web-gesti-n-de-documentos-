//si el usuario es admin puede eliminar documentos
const { Documento } = require("../models");

const eliminarDocumento = async (req, res) => {
  const id = req.params.id;
  const doc = await Documento.findByPk(id); // Busca el documento por su ID
  if (!doc) {
    return res.status(404).json({ mensaje: "Documento no encontrado" });
  }
  await doc.destroy();
  res.json({ mensaje: "Documento eliminado correctamente" });
};

// Nuevo: listar todos los documentos
const listarDocumentos = async (req, res) => {
  const docs = await Documento.findAll();
  res.json(docs);
};

module.exports = { eliminarDocumento, listarDocumentos };
