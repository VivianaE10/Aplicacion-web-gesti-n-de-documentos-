const express = require("express");
const router = express.Router();
const multer = require("multer"); //importa el paquete multer para manejar la subida de archivos
const { cargarCSV } = require("../controllers/csv.controller");
const verificarToken = require("../middlewares/middlewares"); //middleware para verificar el token JWT

// Configuración de multer para subir archivos
const upload = multer({ dest: "uploads/" });

// Ruta para cargar el CSV (protegida)
router.post("/cargar", verificarToken, upload.single("archivo"), cargarCSV);

module.exports = router;
