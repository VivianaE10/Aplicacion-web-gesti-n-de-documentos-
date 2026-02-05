<template>
  <nav
    class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm mb-4 py-2"
  >
    <div class="container">
      <router-link class="navbar-brand d-flex align-items-center gap-2" to="/">
        <i class="bi bi-folder2-open fs-3"></i>
        <span class="fw-bold fs-5">Gestión de Documentos</span>
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto align-items-center gap-2">
          <li class="nav-item">
            <router-link
              class="nav-link nav-link-strong d-flex align-items-center gap-1"
              to="/register"
            >
              <i class="bi bi-person-plus"></i> Registro
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link nav-link-strong d-flex align-items-center gap-1"
              to="/login"
            >
              <i class="bi bi-box-arrow-in-right"></i> Login
            </router-link>
          </li>
          <li class="nav-item" v-if="isLoggedIn && isDashboardRoute">
            <router-link
              class="nav-link nav-link-strong d-flex align-items-center gap-1"
              to="/dashboard"
            >
              <i class="bi bi-speedometer2"></i> Dashboard
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      isLoggedIn: !!localStorage.getItem("token"),
    };
  },
  computed: {
    isDashboardRoute() {
      return this.$route.path === "/dashboard";
    },
  },
  mounted() {
    window.addEventListener("storage", this.syncLoginState);
    this.$watch(
      () => this.$route.path,
      () => {
        this.isLoggedIn = !!localStorage.getItem("token");
      }
    );
  },
  beforeUnmount() {
    window.removeEventListener("storage", this.syncLoginState);
  },
  methods: {
    syncLoginState() {
      this.isLoggedIn = !!localStorage.getItem("token");
    },
  },
};
</script>

<style scoped>
.nav-link-strong {
  color: #fff !important;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  transition: color 0.2s;
}
.nav-link-strong.router-link-exact-active,
.nav-link-strong.router-link-active {
  color: #ffd700 !important;
}
.nav-link-strong:hover,
.nav-link-strong:focus {
  color: #ffd700 !important;
}
</style>
