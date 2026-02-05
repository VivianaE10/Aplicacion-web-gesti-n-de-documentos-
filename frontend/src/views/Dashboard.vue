<template>
  <div class="container py-4">
    <h2 class="mb-4 text-center">Dashboard</h2>
    <div v-if="alerta" :class="`alert alert-${alerta.tipo}`" role="alert">
      {{ alerta.mensaje }}

      <!-- muestra un mensaje de errores si el csv le faltan datos  -->
      <ul
        v-if="alerta.errores && alerta.errores.length"
        class="mt-2 mb-0 text-start"
      >
        <li v-for="(err, idx) in alerta.errores" :key="idx">
          <div><strong>Error:</strong> {{ err.error }}</div>
          <div v-if="err.fila">
            <span v-for="(valor, campo) in err.fila" :key="campo">
              <strong>{{ campo }}:</strong> {{ valor
              }}<span v-if="campo !== Object.keys(err.fila).slice(-1)[0]"
                >,
              </span>
            </span>
          </div>
        </li>
      </ul>
    </div>
    <!-- cargo el archivo-->
    <div
      class="drop-area border border-2 border-primary rounded-3 p-4 mb-4 text-center bg-light"
      @dragover.prevent
      @drop.prevent="onDrop"
    >
      <i class="bi bi-cloud-arrow-up display-4 text-primary mb-2"></i>
      <p class="mb-2">Arrastra y suelta tu archivo CSV aquí o</p>
      <input
        type="file"
        accept=".csv"
        @change="onFileChange"
        class="form-control d-inline w-auto"
      />
    </div>
    <div class="table-responsive">
      <table class="table table-hover align-middle">
        <thead class="table-primary">
          <tr>
            <th>Nombre Doc.</th>
            <th>Usuario</th>
            <th>Fecha Carga</th>
            <th># Registros</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="doc in documentos" :key="doc.id">
            <td>{{ doc.nombre_original }}</td>
            <td>{{ doc.Usuario ? doc.Usuario.nombre : "" }}</td>
            <td>{{ formatFecha(doc.fecha_carga) }}</td>
            <td>{{ doc.cantidad_registros }}</td>
            <td>
              <button
                class="btn btn-outline-success btn-sm me-2"
                @click="descargar(doc)"
              >
                <i class="bi bi-download"></i>
              </button>
              <button
                v-if="rol === 'admin'"
                class="btn btn-outline-danger btn-sm"
                @click="eliminar(doc)"
              >
                <i class="bi bi-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { jwtDecode } from "jwt-decode";
import { obtenerDocumentos, subirArchivoCSV } from "../utils/api";
export default {
  name: "Dashboard",
  data() {
    return {
      documentos: [], // Aquí se cargarán los documentos desde la API
      alerta: null, // Para mostrar mensajes de éxito/error
      rol: "usuario", // Simulación, luego se debe leer del token/localStorage
    };
  },
  async mounted() {
    const token = localStorage.getItem("token");
    if (!token) {
      this.documentos = [];
      this.alerta = {
        tipo: "danger",
        mensaje: "Debes iniciar sesión para acceder al Dashboard.",
      };
      setTimeout(() => {
        this.$router.push("/login");
      }, 2000);
      return;
    }
    // Decodificar el token para obtener el rol real
    try {
      const payload = jwtDecode(token);
      this.rol = payload.rol || "usuario";
    } catch (e) {
      this.rol = "usuario";
    }
    // Obtener documentos reales de la API documentos
    try {
      const res = await obtenerDocumentos();
      this.documentos = res.data;
    } catch (e) {
      this.alerta = {
        tipo: "danger",
        mensaje: "No se pudieron cargar los documentos.",
      };
    }
  },
  methods: {
    formatFecha(fecha) {
      if (!fecha) return "";
      const d = new Date(fecha);
      return d.toLocaleDateString() + " " + d.toLocaleTimeString();
    },
    onFileChange(e) {
      const file = e.target.files[0];
      if (file) this.subirCSV(file);
    },
    onDrop(e) {
      const file = e.dataTransfer.files[0];
      if (file) this.subirCSV(file);
    },
    // Método para subir el archivo CSV a la API
    async subirCSV(file) {
      this.alerta = null;
      try {
        const res = await subirArchivoCSV(file);
        this.alerta = {
          tipo: "success",
          mensaje: res.data.mensaje + ` (${res.data.cantidad} registros)`,
        };
        // Refrescar la lista de documentos
        const docs = await obtenerDocumentos();
        this.documentos = docs.data;
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.mensaje
        ) {
          this.alerta = {
            tipo: "danger",
            mensaje: error.response.data.mensaje,
            errores: error.response.data.errores || [],
          };
        } else {
          this.alerta = {
            tipo: "danger",
            mensaje: "Error al subir el archivo.",
            errores: [],
          };
        }
      }
    },
    descargar(doc) {
      // Lógica para descargar el documento
      this.alerta = {
        tipo: "info",
        mensaje: "Funcionalidad de descarga pendiente...",
      };
    },
    eliminar(doc) {
      // Lógica para eliminar el documento (solo admin)
      this.alerta = {
        tipo: "info",
        mensaje: "Funcionalidad de eliminación pendiente...",
      };
    },
  },
};
</script>

<style scoped>
.drop-area {
  cursor: pointer;
  transition:
    background 0.2s,
    border-color 0.2s;
}
.drop-area:hover {
  background: #e3f0ff;
  border-color: #0d6efd;
}
</style>
