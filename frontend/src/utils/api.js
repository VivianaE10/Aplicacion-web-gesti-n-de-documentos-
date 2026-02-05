import axios from "axios";

const API_URL = "http://localhost:3000";

export const api = axios.create({
  baseURL: API_URL,
});

// Ejemplo de función para registrar usuario
export function registrarUsuario(datos) {
  return api.post("/auth/registro", datos);
}

// Ejemplo de función para login
export function loginUsuario(datos) {
  return api.post("/auth/login", datos);
}
