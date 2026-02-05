<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card>
          <v-card-title class="text-h5">Iniciar Sesión</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="login">
              <v-text-field
                v-model="usuario"
                label="Usuario"
                prepend-inner-icon="mdi-account"
                required
              />
              <v-text-field
                v-model="contrasena"
                label="Contraseña"
                type="password"
                prepend-inner-icon="mdi-lock"
                required
              />
              <v-btn type="submit" color="primary" block class="mt-4">
                Ingresar
              </v-btn>
            </v-form>
            <v-alert v-if="error" type="error" class="mt-2">{{
              error
            }}</v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const usuario = ref("");
const contrasena = ref("");
const error = ref("");
const router = useRouter();

const login = async () => {
  error.value = "";
  try {
    const res = await axios.post("http://localhost:3000/auth/login", {
      correo: usuario.value,
      contrasena: contrasena.value,
    });
    localStorage.setItem("token", res.data.token);
    router.push("/dashboard");
  } catch (e) {
    error.value = e.response?.data?.mensaje || "Error al iniciar sesión";
  }
};
</script>
