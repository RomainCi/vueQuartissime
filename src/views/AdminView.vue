<template>
  <div>
    <div class="container">
      <admin />
    </div>
    <router-link :to="{ path: '/oublie' }"> mot de passe oublié </router-link>
  </div>
</template>

<script>
import AdminComponent from "@/components/AdminComponent.vue";
const AdminView = {
  components: {
    admin: AdminComponent,
  },
};
export default AdminView;
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
}
</style>