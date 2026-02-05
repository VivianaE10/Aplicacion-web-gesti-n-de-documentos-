<template>
  <div class="container py-4">
    <h2 class="mb-4 text-center">Dashboard</h2>
    <!-- Alerta de feedback -->
    <div v-if="alerta" :class="`alert alert-${alerta.tipo}`" role="alert">
      {{ alerta.mensaje }}
    </div>
    <!-- Área de carga de archivos -->
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
    <!-- Tabla de documentos -->
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
            <td>{{ doc.usuario_nombre }}</td>
            <td>{{ doc.fecha_carga }}</td>
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
export default {
  name: "Dashboard",
  data() {
    return {
      documentos: [], // Aquí se cargarán los documentos desde la API
      alerta: null, // { tipo: 'success'|'danger', mensaje: '' }
      rol: "usuario", // Simulación, luego se debe leer del token/localStorage
    };
  },
  mounted() {
    // Aquí deberías cargar los documentos y el rol real del usuario
    // this.rol = localStorage.getItem('rol') || 'usuario';
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0];
      if (file) this.subirCSV(file);
    },
    onDrop(e) {
      const file = e.dataTransfer.files[0];
      if (file) this.subirCSV(file);
    },
    subirCSV(file) {
      // Aquí irá la lógica para subir el archivo al backend
      // y manejar la respuesta de éxito/error
      this.alerta = {
        tipo: "info",
        mensaje: "Funcionalidad de carga pendiente...",
      };
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
