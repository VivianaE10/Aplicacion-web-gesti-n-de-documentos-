<template>
  <div
    class="hero-bg d-flex flex-column align-items-center justify-content-center text-center py-5"
  >
    <div class="card shadow-lg border-0 p-4 home-card">
      <img
        src="https://cdn-icons-png.flaticon.com/512/2991/2991108.png"
        alt="Gestión de Documentos"
        class="mb-3 hero-img mx-auto"
      />
      <h1 class="display-6 fw-bold mb-2">
        Bienvenido a <span class="text-primary">Gestión de Documentos</span>
      </h1>
      <span class="badge bg-primary mb-3"
        ><i class="bi bi-cloud-arrow-up me-1"></i> Plataforma Segura</span
      >
      <p class="lead mb-4">
        Organiza, sube y gestiona tus documentos de manera segura y
        eficiente.<br />
        <span class="text-success fw-semibold"
          >¡Tu información siempre disponible y protegida!</span
        >
      </p>
      <div class="d-flex justify-content-center gap-2 mb-2">
        <router-link
          to="/register"
          class="btn btn-primary btn-lg px-4 btn-glow"
        >
          <i class="bi bi-person-plus"></i> Registrarse
        </router-link>
        <router-link to="/login" class="btn btn-outline-primary btn-lg px-4">
          <i class="bi bi-box-arrow-in-right"></i> Iniciar Sesión
        </router-link>
      </div>
      <div class="mt-3">
        <i class="bi bi-file-earmark-text text-secondary fs-3 me-2"></i>
        <i class="bi bi-shield-lock text-secondary fs-3 me-2"></i>
        <i class="bi bi-people text-secondary fs-3"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style scoped>
/* Fondo principal tipo hero */
.hero-bg {
  min-height: 70vh;
  background: linear-gradient(135deg, #e3f0ff 0%, #f9f9f9 100%);
}
/* Card central visual */
.home-card {
  max-width: 480px;
  width: 100%;
  background: rgba(255, 255, 255, 0.95);
}
/* Imagen con sombra */
.hero-img {
  width: 100px;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1));
}

/* Efecto glow para el botón de registro */
.btn-glow {
  box-shadow:
    0 0 16px 4px #fff,
    0 2px 8px 0 rgba(0, 0, 0, 0.1);
  border-width: 2px;
  font-weight: 600;
  transition:
    box-shadow 0.2s,
    transform 0.2s;
}
.btn-glow:hover,
.btn-glow:focus {
  box-shadow:
    0 0 24px 8px #fff,
    0 4px 16px 0 rgba(0, 0, 0, 0.15);
  transform: translateY(-2px) scale(1.04);
}
</style>
