//ejecuta las peticiones relacionadas con el manejo de archivos CSV

const fs = require("fs"); //modulo de sistema de archivos de Node.js para leer archivos
const { parse } = require("csv-parse"); //paquete para parsear archivos CSV
const { DatoCSV, Documento } = require("../models"); //importa los modelos necesarios para guardar datos en la base de datos

// Controlador para cargar y procesar el CSV
const cargarCSV = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ mensaje: "No se envió ningún archivo" });
  }

  const resultados = []; //para almacenar los datos válidos
  const errores = [];
  //esto ayuda a identificar en qué fila ocurrió un error
  let filaActual = 2; //empieza en 2 porque la fila 1 son los encabezados

  const stream = fs // lee el archivo CSV como un stream (stream) es como leer el archivo en partes pequeñas en lugar de cargar todo de una vez
    .createReadStream(req.file.path) //lee el archivo desde la ruta temporal donde se guardó
    .pipe(parse({ columns: true, trim: true })); //parsing del CSV, indicando que la primera fila contiene los nombres de las columnas

  //este ciclo lee cada fila del CSV
  for await (const row of stream) {
    // me recorre cada fila del CSV una por una
    // Validaciones manuales
    if (!row.correo || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(row.correo)) {
      errores.push({ fila: row, error: "Correo inválido" });
      filaActual++; // Incrementa el contador de filas procesadas, se suma 1 al contador final
      continue;
    }
    if (!row.nombre) {
      errores.push({ fila: row, error: "Nombre obligatorio" });
      filaActual++; // Incrementa el contador de filas procesadas
      continue;
    }
    if (!row.telefono || !/^\d+$/.test(row.telefono)) {
      errores.push({ fila: row, error: "Teléfono inválido" });
      filaActual++; // Incrementa el contador de filas procesadas
      continue;
    }
    if (!row.ciudad) {
      errores.push({ fila: row, error: "Ciudad obligatoria" });
      filaActual++; // Incrementa el contador de filas procesadas
      continue;
    }

    // Si pasa validación, lo agregamos a resultados
    resultados.push({
      correo: row.correo,
      nombre: row.nombre,
      telefono: row.telefono,
      ciudad: row.ciudad,
      notas: row.notas || "",
    });
    filaActual++; // Incrementa el contador de filas procesadas
  }

  // Si hay errores, los devolvemos
  if (errores.length > 0) {
    return res.status(400).json({ mensaje: "Errores en el CSV", errores });
  }

  // antes de guardar los csv se crea un registro en documentos con la info del archivo y el usuario que lo subió
  const datosDocumento = {
    nombre_original: req.file.originalname,
    nombre_guardado: req.file.filename,
    cantidad_registros: resultados.length,
    usuario_id: req.usuario.id, // mirar  que el usuario esté en el token
    fecha_carga: new Date(),
  };
  console.log("Datos a guardar en Documento:", datosDocumento);
  const documento = await Documento.create(datosDocumento);
  // Recargar para obtener fecha_carga y usuario
  await documento.reload({
    include: [{ model: require("../models").Usuario, attributes: ["nombre"] }],
  });

  // 2. Agregar documento_id a cada fila
  const datosConDocumentoId = resultados.map((row) => ({
    ...row,
    documento_id: documento.id, //se agrega el id del documento creado antes de guardar en la tabla datos_csv
  }));

  // 3. Guardar los datos en la tabla datos_csv
  await DatoCSV.bulkCreate(datosConDocumentoId);

  res.json({
    mensaje: "Datos guardados correctamente",
    cantidad: resultados.length,
    documento,
  });
};

module.exports = { cargarCSV };
