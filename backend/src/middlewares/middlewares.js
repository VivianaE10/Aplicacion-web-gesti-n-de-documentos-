// este miderware verifica el token JWT en las solicitudes protegidas

const jwt = require("jsonwebtoken");

const verificarToken = (req, res, next) => {
  //“ El header Autorizacion le dice al backend Soy un usuario autenticado, aquí está mi token, déjame pasar”.
  const authHeader = req.headers.authorization; //el header autoriza el token si existe y los deja pasar para subir el archivo, si no exite genera un error
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ mensaje: "Token no proporcionado" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ mensaje: "Token inválido o expirado" });
  }
};

module.exports = verificarToken;
