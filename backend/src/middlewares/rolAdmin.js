// solo el admin puede eliminar documentos

function soloAdmin(req, res, next) {
  if (req.usuario && req.usuario.rol === "admin") {
    // Verifica que el usuario sea admin y si es usuario continúa
    return next();
  }
  return res
    .status(403)
    .json({ mensaje: "Acceso denegado: solo admin puede eliminar documentos" });
}

module.exports = soloAdmin;
