//resivir las peticiones de las rutas de autenticación, utilizar el modelo de Usuario y devolver respuestas
const bcrypt = require("bcryptjs");
const { Usuario } = require("../models");

// Obtener todos los usuarios
const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      attributes: { exclude: ["contrasena"] }, // Excluir la contraseña de la respuesta
    });
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener usuarios" });
  }
};

// Obtener usuario por ID
const obtenerUsuarioPorId = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id, {
      attributes: { exclude: ["contrasena"] }, // Excluir la contraseña de la respuesta
    });
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al buscar usuario" });
  }
};

// Actualizar usuario por ID
const actualizarUsuario = async (req, res) => {
  try {
    const { nombre, correo, contrasena, rol } = req.body;
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    // Si se envía una nueva contraseña, la encripta
    let nuevaContrasena = usuario.contrasena;
    if (contrasena) {
      nuevaContrasena = await bcrypt.hash(contrasena, 10);
    }

    await usuario.update({
      nombre: nombre || usuario.nombre,
      correo: correo || usuario.correo,
      contrasena: nuevaContrasena,
      rol: rol || usuario.rol,
    });

    res.json({ mensaje: "Usuario actualizado correctamente", usuario });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar usuario" });
  }
};

// Registrar usuario con valdacion de contaseñas
const registrarUsuario = async (req, res) => {
  try {
    const { nombre, correo, contrasena, confirmarContrasena, rol } = req.body;

    // Validar campos obligatorio
    if (!nombre || !correo || !contrasena || !confirmarContrasena) {
      return res
        .status(400)
        .json({ mensaje: "Todos los campos son obligatorios" });
    }
    // Validar que las contraseñas coincidan
    if (contrasena !== confirmarContrasena) {
      return res.status(400).json({ mensaje: "Las contraseñas no coinciden" });
    }

    // Validar rol
    const rolesValidos = ["usuario", "admin"];
    if (rol && !rolesValidos.includes(rol)) {
      return res.status(400).json({ mensaje: "Rol no válido" });
    }
    // Verificar si el correo ya existe
    const usuarioExistente = await Usuario.findOne({ where: { correo } });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: "El correo ya está registrado" });
    }

    // Encriptar contraseña
    const contrasenaEncriptada = await bcrypt.hash(contrasena, 10);

    // Crear usuario
    const nuevoUsuario = await Usuario.create({
      nombre,
      correo,
      contrasena: contrasenaEncriptada,
      rol: rol || "usuario",
    });

    res.status(201).json({
      mensaje: "Usuario registrado correctamente",
      usuario: {
        id: nuevoUsuario.id,
        nombre: nuevoUsuario.nombre,
        correo: nuevoUsuario.correo,
        rol: nuevoUsuario.rol,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al registrar usuario" });
  }
};

//implementar login con los jwt
const jwt = require("jsonwebtoken"); //importa el paquete jsonwebtoken para manejar tokens JWT

const loginUsuario = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;

    // Validar campos
    if (!correo || !contrasena) {
      return res
        .status(400)
        .json({ mensaje: "Correo y contraseña son obligatorios" });
    }

    // Buscar usuario por correo
    const usuario = await Usuario.findOne({ where: { correo } });
    if (!usuario) {
      return res.status(400).json({ mensaje: "Usuario no encontrado" });
    }

    // Comparar contraseñas
    const esValida = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!esValida) {
      return res.status(400).json({ mensaje: "Contraseña incorrecta" });
    }

    // Generar token JWT
    const token = jwt.sign(
      {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol,
      },
      process.env.JWT_SECRET, // esta es la clae secreta que valida el token
      { expiresIn: "2h" },
    );

    res.json({
      mensaje: "Login exitoso",
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al iniciar sesión" });
  }
};

module.exports = {
  registrarUsuario,
  loginUsuario,
  obtenerUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
};
