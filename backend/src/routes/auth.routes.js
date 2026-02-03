//crea las rutas relacionadas con la autenticación (registro y login) y dirige al cntrolador

const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

// endpoint para registrar usuario
router.post("/registro", authController.registrarUsuario);

// endpoint para obtener todos los usuarios (para pruebas)
router.get("/", authController.obtenerUsuarios);
// endpoint para obtener un usuario por ID (para pruebas)
router.get("/:id", authController.obtenerUsuarioPorId);

// endpoint para actualizar un usuario
router.put("/:id", authController.actualizarUsuario);

// Ruta para login (la haremos luego)
router.post("/login", authController.loginUsuario);

module.exports = router;
