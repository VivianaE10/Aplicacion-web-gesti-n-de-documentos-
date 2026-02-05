const express = require("express");
const router = express.Router();
const multer = require("multer"); //importa el paquete multer para manejar la subida de archivos
const { cargarCSV } = require("../controllers/csv.controller");
const verificarToken = require("../middlewares/middlewares"); //middleware para verificar el token JWT
const path = require("path");

// Configuración de multer para subir archivos
const upload = multer({ dest: "uploads/" });

// endpoint para cargar el CSV (protegida)
router.post("/cargar", verificarToken, upload.single("archivo"), cargarCSV);

// Endpoint para descargar un archivo CSV por nombre (solo autenticado)
router.get("/descargar/:nombre", verificarToken, (req, res) => {
  const nombreArchivo = req.params.nombre;
  const rutaArchivo = path.join(__dirname, "../../uploads", nombreArchivo);
  res.download(rutaArchivo, nombreArchivo, (err) => {
    if (err) {
      return res.status(404).json({ mensaje: "Archivo no encontrado" });
    }
  });
});

module.exports = router;
