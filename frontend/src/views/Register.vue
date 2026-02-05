<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6 col-lg-4">
        <div class="card shadow p-4">
          <h2 class="mb-4 text-center">Registro</h2>
          <form @submit.prevent="registrar">
            <!-- ejecuta el metodo registrar al enviar el formulario cuando hace clic en el boton -->
            <div class="mb-3">
              <label class="form-label">Nombre</label>
              <div class="input-group">
                <span class="input-group-text"
                  ><i class="bi bi-person"></i
                ></span>
                <input
                  v-model="nombre"
                  type="text"
                  class="form-control"
                  required
                />
              </div>
            </div>
            <div class="mb-3">
              <label class="form-label">Correo</label>
              <div class="input-group">
                <span class="input-group-text"
                  ><i class="bi bi-envelope"></i
                ></span>
                <input
                  v-model="correo"
                  type="email"
                  class="form-control"
                  required
                />
              </div>
            </div>
            <div class="mb-3">
              <label class="form-label">Contraseña</label>
              <div class="input-group">
                <span class="input-group-text"><i class="bi bi-lock"></i></span>
                <input
                  v-model="contrasena"
                  type="password"
                  class="form-control"
                  required
                />
              </div>
            </div>
            <div class="mb-3">
              <label class="form-label">Confirmar Contraseña</label>
              <div class="input-group">
                <span class="input-group-text"><i class="bi bi-lock"></i></span>
                <input
                  v-model="confirmarContrasena"
                  type="password"
                  class="form-control"
                  required
                />
              </div>
            </div>
            <div class="mb-3">
              <label class="form-label">Rol</label>
              <div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    id="rolUsuario"
                    value="usuario"
                    v-model="rol"
                  />
                  <label class="form-check-label" for="rolUsuario">User</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    id="rolAdmin"
                    value="admin"
                    v-model="rol"
                  />
                  <label class="form-check-label" for="rolAdmin">Admin</label>
                </div>
              </div>
            </div>
            <button type="submit" class="btn btn-primary w-100">
              Registrarse
            </button>
          </form>
          <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
          <div v-if="exito" class="alert alert-success mt-3">{{ exito }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { registrarUsuario } from "../utils/api";
export default {
  name: "Register",
  data() {
    return {
      nombre: "",
      correo: "",
      contrasena: "",
      confirmarContrasena: "",
      rol: "usuario",
      error: "",
      exito: "",
    };
  },
  methods: {
    async registrar() {
      this.error = "";
      this.exito = "";
      if (this.contrasena !== this.confirmarContrasena) {
        this.error = "Las contraseñas no coinciden";
        return;
      }
      try {
        // Llamamos a la función que hace la llamada a la API para registrar el usuario
        await registrarUsuario({
          nombre: this.nombre,
          correo: this.correo,
          contrasena: this.contrasena,
          confirmarContrasena: this.confirmarContrasena,
          rol: this.rol,
        });
        this.exito = "Registro exitoso. Ahora puedes iniciar sesión.";
        this.nombre =
          this.correo =
          this.contrasena =
          this.confirmarContrasena =
            "";
        this.rol = "usuario";
        // Redirigir al login después del registro exitoso
        this.$router.push("/login");
      } catch (e) {
        this.error = e.response?.data?.mensaje || "Error al registrar usuario";
      }
    },
  },
};
</script>
