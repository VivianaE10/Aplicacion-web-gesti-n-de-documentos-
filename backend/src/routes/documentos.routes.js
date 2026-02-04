const express = require("express");
const router = express.Router();
const verificarToken = require("../middlewares/middlewares");
const soloAdmin = require("../middlewares/rolAdmin");
const { eliminarDocumento, listarDocumentos } = require("../controllers/documentos.controller");

// Ruta para eliminar documento (solo admin)
router.delete("/:id", verificarToken, soloAdmin, eliminarDocumento);

// Ruta para listar todos los documentos (autenticado)
router.get("/", verificarToken, listarDocumentos);

module.exports = router;
