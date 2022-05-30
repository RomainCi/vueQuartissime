<template>
  <div class="bigContainer">
    <h1>Dashboard Admin</h1>
    <header class="navBar">
      <section>
        <nav class="dash">
          <ul>
            <li @click="this.show = 'a'">creation admin</li>
            <li @click="showB">consultation / edit admin</li>
            <li @click="showC">creation comité quartier</li>
            <li @click="showD">consultation /edit comité quartier</li>
            <li></li>
          </ul>
        </nav>
      </section>
    </header>

    <div class="container">
      <div v-if="show == ''">
        <h1>Petit presententation</h1>
      </div>
      <creationAdmin v-else-if="show == 'a'" :recharge="affichageAdmin" />

      <editShowAdmin
        v-else-if="show == 'b'"
        :data="admins"
        :recharge="affichageAdmin"
      />
      <creationComite v-else-if="show == 'c'" />

      <editShowComite v-else-if="show == 'd'" />
    </div>
  </div>
</template>

<script>
import CreationAdminComponent from "@/components/CreationAdminComponent.vue";
import CreationComiteComponent from "@/components/CreationComiteComponent.vue";
import EditShowAdminComponent from "@/components/EditShowAdminComponent.vue";
import EditShowComiteComponent from "@/components/EditShowComiteComponent.vue";

const DashboardView = {
  components: {
    creationAdmin: CreationAdminComponent,
    editShowAdmin: EditShowAdminComponent,
    creationComite: CreationComiteComponent,
    editShowComite: EditShowComiteComponent,
  },
  data() {
    return {
      show: "",
      admins: "",
    };
  },
  mounted() {
    this.affichageAdmin();
    this.affichageComite();
    this.affichageAssoc();
  },
  methods: {
    async affichageAdmin() {
      try {
        const promise = await fetch("http://127.0.0.1:8000/api/showAdmin", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        console.log(promise);
        let res = await promise.json();
        this.admins = res.admin;
        console.log(this.admins);
      } catch (error) {
        console.log(error);
      }
    },
    async affichageComite() {},

    async affichageAssoc() {},

    showB() {
      return (this.show = "b");
    },
    showC() {
      return (this.show = "c");
    },
    showD() {
      return (this.show = "d");
    },
  },
};
export default DashboardView;
</script>

<style scoped>
h1 {
  grid-area: header;
}
.container {
  display: flex;
  justify-content: center;
  grid-area: contenu;
}
.bigContainer {
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-template-rows: 1fr 4fr 1fr;
  grid-template-areas:
    "header header"
    "dash contenu"
    "footer footer";
}
.dash {
  grid-area: dash;
  background-color: red;
}
</style>