<template>
  <div class="d-flex flex-column min-vh-100">
    <Navbar />
    <main class="flex-fill container py-4">
      <router-view />
    </main>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue"; // Importamos el componente Navbar para todas las pagina
export default {
  name: "App",
  components: { Navbar },
};
</script>
