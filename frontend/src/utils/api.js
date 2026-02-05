// Eliminar documento por ID
export function deleteDocumento(id, token) {
  console.log("Enviando DELETE a /documentos/" + id, "con token:", token);
  return api.delete(`/documentos/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
// Subir archivo CSV
export function subirArchivoCSV(file) {
  const formData = new FormData();
  formData.append("archivo", file);
  return api.post("/csv/cargar", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

// Descargar archivo CSV por nombre_guardado
export function descargarArchivoCSV(nombre_guardado) {
  return api.get(`/csv/descargar/${nombre_guardado}`, {
    responseType: "blob",
  });
}
import axios from "axios"; // importar axios para hacer llamadas HTTP

const API_URL = "http://localhost:3000";

export const api = axios.create({
  baseURL: API_URL,
});

// para agregar el token a cada petición si el usuario está autenticado
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// metodo para registrar usuario
export function registrarUsuario(datos) {
  return api.post("/auth/registro", datos);
}

// metodo para login usuario
export function loginUsuario(datos) {
  return api.post("/auth/login", datos);
}

// Obtener documentos
export function obtenerDocumentos() {
  return api.get("/documentos");
}
