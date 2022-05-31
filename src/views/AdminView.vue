<template>
  <div>
    <header class="entete">
      <img src="../assets/logo.png" alt="" class="logo" />
    </header>
    <div class="container">
      <admin />
    </div>
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
.entete {
  min-height: 80px;
  border-bottom: 4px solid black;
}

.logo {
  height: 7vh;
  margin: 20px;
}
.container {
  display: flex;
  justify-content: center;
}
</style>
