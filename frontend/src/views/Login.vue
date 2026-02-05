<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6 col-lg-4">
        <div class="card shadow p-4">
          <h2 class="mb-4 text-center">Login</h2>
          <form @submit.prevent="login">
            <div class="mb-3">
              <label class="form-label">Correo</label>
              <div class="input-group">
                <span class="input-group-text"
                  ><i class="bi bi-person"></i
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
            <button type="submit" class="btn btn-primary w-100">
              <i class="bi bi-box-arrow-in-right"></i> Ingresar
            </button>
          </form>
          <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { loginUsuario } from "../utils/api";
export default {
  name: "Login",
  data() {
    return {
      correo: "",
      contrasena: "",
      error: "",
    };
  },
  methods: {
    async login() {
      this.error = "";
      try {
        const response = await loginUsuario({
          correo: this.correo,
          contrasena: this.contrasena,
        });
        // Guardar el token en el almacenamiento local y redirigir al dashboard
        localStorage.setItem("token", response.data.token);
        this.$router.push("/dashboard");
      } catch (e) {
        this.error = e.response?.data?.mensaje || "Credenciales incorrectas";
      }
    },
  },
};
</script>
