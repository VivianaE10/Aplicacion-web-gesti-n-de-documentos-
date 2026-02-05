//si el usuario es admin puede eliminar documentos
const { Documento, Usuario } = require("../models");

const eliminarDocumento = async (req, res) => {
  const id = req.params.id;
  const doc = await Documento.findByPk(id); // Busca el documento por su ID
  if (!doc) {
    return res.status(404).json({ mensaje: "Documento no encontrado" });
  }
  await doc.destroy();
  res.json({ mensaje: "Documento eliminado correctamente" });
};

// para que me liste todos los documentos con usuario y fecha
const listarDocumentos = async (req, res) => {
  const docs = await Documento.findAll({
    include: [{ model: Usuario, attributes: ["nombre"] }],
    order: [["id", "DESC"]],
  });
  console.log("Documentos enviados:", JSON.stringify(docs, null, 2));
  res.json(docs);
};

module.exports = { eliminarDocumento, listarDocumentos };
