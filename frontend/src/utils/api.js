import axios from "axios"; // importar axios para hacer llamadas HTTP

const API_URL = "http://localhost:3000";

export const api = axios.create({
  baseURL: API_URL,
});

// metodo para registrar usuario
export function registrarUsuario(datos) {
  return api.post("/auth/registro", datos);
}

// metodo para login usuario
export function loginUsuario(datos) {
  return api.post("/auth/login", datos);
}
